import { Observable } from "rxjs";
import { User } from "src/app/security/models/User";
import { Profile } from "../models/Profile";

export interface SearchRepository {
    getUsers(keyWords:string[]): Observable<User[]>;
}