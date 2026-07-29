import { Injectable } from "@angular/core";
import { ApiService } from "../../../core/services/api.service";
import { SearchSubjectDTO } from "../../../core/models/searchSubjectDTO";
import { SearchResponse } from "../../../core/models/searchResponse";
import { Filiere } from "../../../core/models/filiere.model";


@Injectable(
    {
        providedIn:'root'
    }
)

export class FiliereService extends ApiService{
    private endpoint = 'filieres';

    override findAll<T>(){
        return super.findAll<T>(this.endpoint);
    }

    searchFilieres(dto: SearchSubjectDTO){
        return super.search<SearchResponse<Filiere>>(
            this.endpoint,
            dto
        );
    }
}