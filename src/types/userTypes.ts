import { User } from "./userData";

export interface UserData {
    user: User;
    updateUser(newUser: User): void;
}

