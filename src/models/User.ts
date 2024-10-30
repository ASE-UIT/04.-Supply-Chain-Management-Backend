import { User } from "@scm/entities/user.entity";

export class UserModal {
    id: number;
    username: string;
    role: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;

    constructor(user: User) {
        this.id = user.id;
        this.username = user.username;
        this.role = user.role;
        this.name = user.name;
        this.email = user.email;
        this.createdAt = user.createdAt;
        this.updatedAt = user.updatedAt;
        this.deletedAt = user.deletedAt;
    }

    static fromArray(users: User[]): UserModal[] {
        return users.map(user => new UserModal(user));
    }
}