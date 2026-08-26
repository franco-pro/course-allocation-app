import { Injectable } from "@angular/core";
import { ApiService } from "../../../core/services/api.service";
import { SearchSubjectDTO } from "../../../core/models/searchSubjectDTO";
import { SearchResponse } from "../../../core/models/searchResponse";
import { Subject } from "../../../core/models/matiere.model";
import { of, tap } from "rxjs";

@Injectable(
    {
        providedIn:'root'
    }
)

export class SubjectsService extends ApiService{
    private endpoint = 'subjects';
     private subjectCache?: Subject[];

    override findAll<T>(){
        if(this.subjectCache){
            console.log('Returning cached subjects:', this.subjectCache);
            return of(this.subjectCache as T[]);
        }
        return super.findAll<T>(this.endpoint).pipe(
            tap((subjects: T[]) => {
                this.subjectCache = subjects as Subject[];
            })
        );
    }

    searchSubjects(dto: SearchSubjectDTO){
        return super.search<SearchResponse<Subject>>(
            this.endpoint,
            dto
        );
    }
}