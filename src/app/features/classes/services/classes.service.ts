import { Injectable } from "@angular/core";
import { ApiService } from "../../../core/services/api.service";
import { SearchClassDTO } from "../../../core/models/searchClassDTO";
import { SearchResponse } from "../../../core/models/searchResponse";
import { Class } from "../../../core/models/classe.model";

@Injectable({
    providedIn: 'root'
})
export class ClassesService extends ApiService{
    private endpoint = 'classes';
    override findAll<T>(){
        return super.findAll<T>(this.endpoint);
    }

    searchClasses(dto: SearchClassDTO){
        return super.search<SearchResponse<Class>>(
            this.endpoint,
            dto
        );
    }
}