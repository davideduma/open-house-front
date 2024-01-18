import { Observable } from "rxjs/internal/Observable";
import { User } from "src/app/security/models/User";
import { Profile } from "../models/Profile";

export interface LoginRepository {
    //whoAmI(securityToken:string, user:User|undefined): Observable<Profile>;
    signIn(user:User): Observable<Profile>;
    signOut(user:User): Observable<void>;
}