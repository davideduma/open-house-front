import { User } from "../models/User";

export class SecurityValidations {
    protected isSecurityTokenTrustworthy(user:User): boolean {
        return (user.userId > 0 && user.securityToken.length > 0 
            && user.userName.length > 0);
    }

    protected areCredentialsCompleted(user:User): boolean {
        return user.password.length > 0 
            && user.userName.length > 0;
    }
}