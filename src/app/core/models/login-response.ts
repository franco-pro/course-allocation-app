import { UserInterface } from "./user.model";

export interface LoginResponse {
    accessToken: string
    user: UserInterface
}