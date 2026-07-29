import { Injectable } from "@angular/core";
import { ApiService } from "../../../core/services/api.service";
import { SearchSubjectDTO } from "../../../core/models/searchSubjectDTO";
import { SearchResponse } from "../../../core/models/searchResponse";
import { Subject } from "../../../core/models/matiere.model";

@Injectable(
    {
        providedIn:'root'
    }
)

export class SubjectsService extends ApiService{
    private endpoint = 'subjects';

    override findAll<T>(){
        return super.findAll<T>(this.endpoint);
    }

    searchSubjects(dto: SearchSubjectDTO){
        return super.search<SearchResponse<Subject>>(
            this.endpoint,
            dto
        );
    }
}