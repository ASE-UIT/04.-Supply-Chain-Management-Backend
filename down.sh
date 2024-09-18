#!/bin/bash

# Determine the operating system
OS=$(uname -s)

# Run docker-compose down based on the operating system
if [[ "$OS" == "Linux" ]]; then
    docker compose --env-file staging.env down
elif [[ "$OS" == "Darwin" ]]; then
    docker compose --env-file staging.env down
elif [[ "$OS" == "MINGW"* ]]; then
    docker-compose --env-file staging.env down
else
    echo "Unsupported operating system: $OS"
fi