#!/bin/bash

# Generate random password
PASSWORD_DB=$(openssl rand -base64 18 | tr -dc 'a-zA-Z0-9')

# Create .env file if it doesn't exist
if [ ! -f staging.env ]; then
    cat <<EOF > staging.env
MODE=test
PORT=8182
MONGODB_PASSWORD=$PASSWORD_DB
DATABASE_HOST=mongodb://supplychain:$PASSWORD_DB@mongodb/supplychain?retryWrites=true&w=majority&appName=gstb
UPLOAD_STORAGE_PATH=uploads/
EOF

    cat <<EOF > db-seed.sh
#! /bin/bash
docker cp supplychain.users.json mongodb:/tmp/supplychain.users.json
docker exec mongodb bash -c 'mongoimport --host 127.0.0.1 --db supplychain --username supplychain --password $PASSWORD_DB --collection users --type json --file /tmp/supplychain.users.json --jsonArray'
EOF
fi


# Determine the operating system
# OS=$(uname -s)

# Run docker-compose up based on the operating system
# if [[ "$OS" == "Linux" ]]; then
#     docker compose --env-file staging.env up --build -d
# elif [[ "$OS" == "Darwin" ]]; then
#     docker compose --env-file staging.env up --build -d
# elif [[ "$OS" == "MINGW"* ]]; then
#     docker-compose --env-file staging.env up --build -d
# else
#     echo "Unsupported operating system: $OS"
# fi