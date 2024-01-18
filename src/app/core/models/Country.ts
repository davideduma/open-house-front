import { NationalDocument } from "./NationalDocument";

export interface Country {
    name:string,
    documentTypes: Array<NationalDocument>
}