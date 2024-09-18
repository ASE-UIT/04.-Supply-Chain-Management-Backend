import { Document } from "mongoose";

export interface UserInterface extends Document {
    _id: string;
    username: string;
    password: string;
    role: string;
    name: string;
    email: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export class UserModal {
    id: string;
    username: string;
    role: string;
    name: string;
    email: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;

    constructor(user: UserInterface) {
        this.id = user._id;
        this.username = user.username;
        this.role = user.role;
        this.name = user.name;
        this.email = user.email;
        this.description = user.description;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.deletedAt = user.deletedAt;
    }

    static fromArray(users: UserInterface[]): UserModal[] {
        return users.map(user => new UserModal(user));
    }
}