import { Observable } from "rxjs/internal/Observable";
import { Profile } from "src/app/core/models/Profile";
import { User } from "../models/User";

export interface UserRepository {
    isUserAuthenticated(user:User): Observable<boolean>;
}