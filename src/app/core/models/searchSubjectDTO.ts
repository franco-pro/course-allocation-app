import { searchDTO } from "./searchDTO";

export interface SearchSubjectDTO extends searchDTO{
    classIds?:number[]
}