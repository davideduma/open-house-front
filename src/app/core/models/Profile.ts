import { User } from "src/app/security/models/User";
import { ProfileData } from '../repositories/ProfileData';

export class Profile extends User {    
    protected _firstName:string;
    protected _lastName:string;
    protected _country:string;
    protected _documentType:string;
    protected _documentNumber:string;
    protected _email:string;
    
    constructor(profileData:ProfileData) {
        super(profileData);
        this._firstName = profileData.firstName || "";
        this._lastName = profileData.lastName || "";
        this._email = profileData.email || "";
        this._country = profileData.country || "";
        this._documentType = profileData.documentType || "";
        this._documentNumber = profileData.documentNumber || "";
    }

    get firstName():string {
        return this._firstName;
    }

    get lastName():string {
        return this._lastName;
    }

    get email():string {
        return this._email;
    }

    get country():string {
        return this._country;
    }

    get documentType():string {
        return this._documentType;
    }

    get documentNumber():string {
        return this._documentNumber;
    }

    override get isValid():boolean {
        return this.userName.length > 5 
            && this.securityToken.length > 0;
    }
}
