import { Rol } from "./rol.model";

export class User {
    id?: number;
    nickname?: string;
    email?: string;
    password?: string;
    token?: string;
    rol?: Rol;
}