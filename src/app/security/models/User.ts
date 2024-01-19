import { UserData } from "../repositories/UserData";

export class User {
    protected _userId:number;
    protected _userName:string;
    protected _password:string;
    protected _securityToken:string;
    protected _photo:string;

    constructor(userData:UserData) {
        this._userId = userData.userId || -1;
        this._userName = userData.userName;
        this._password = userData.password || "";
        this._securityToken = userData.securityToken || "";
        this._photo = userData.photo || "";
    }

    get userId():number {
        return this._userId;
    }

    set userId(userId:number) {
        this._userId = userId;
    }

    get userName():string {
        return this._userName;
    }

    get password():string {
        return this._password;
    }

    get securityToken():string {
        return this._securityToken;
    }

    set securityToken(securityToken:string) {
        this._securityToken = securityToken;
    }

    get isValid():boolean {
        return this._userName.length > 5 && this._password.length >= 6
    }

    get photo():string {
        return this._photo;
    }

}