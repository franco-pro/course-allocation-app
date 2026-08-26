import { Injectable } from "@angular/core";
import { ApiService } from "../../../core/services/api.service";
import { SearchClassDTO } from "../../../core/models/searchClassDTO";
import { SearchResponse } from "../../../core/models/searchResponse";
import { Class } from "../../../core/models/classe.model";
import { of, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ClassesService extends ApiService{
    private endpoint = 'classes';
     private classCache?: Class[];
    override findAll<T>(){
        if(this.classCache){
            console.log('Returning cached classes:', this.classCache);
            return of(this.classCache as T[]);
        }
        return super.findAll<T>(this.endpoint).pipe(
            tap((classes: T[]) => {
                this.classCache = classes as Class[];
            })
        );
    }

    searchClasses(dto: SearchClassDTO){
        return super.search<SearchResponse<Class>>(
            this.endpoint,
            dto
        );
    }

    getClassById(id: string){
        return super.findOne<Class>(this.endpoint, id);
    }
}