import { Observable } from "rxjs/internal/Observable";
import { Country } from "../models/Country";
import { NationalDocument } from "../models/NationalDocument";
import { Profile } from "../models/Profile";

export interface RegisterRepository {
    newUser(profile:Profile): Observable<Profile>;
    countries(): Observable<Array<Country>>;
    countryDocumentType(countries:Country[], countryName:string): Array<NationalDocument>;
}