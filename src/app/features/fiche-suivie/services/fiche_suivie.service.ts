import { Injectable } from "@angular/core";
import { ApiService } from "../../../core/services/api.service";
import { SearchFicheSuivieModel } from "../../../core/models/search.fiche_suivie.model";
import { HttpParams } from "@angular/common/http";
import { FicheSuivieModel } from "../../../core/models/fiche_suivie.model";

@Injectable({
    providedIn:"root"
})

export class FicheSuivieService extends ApiService{
    private endpoint = "pointage/fiche_suivie";
    generate(dto:SearchFicheSuivieModel){
        const params = new HttpParams()
        .set('dateDebut', dto.dateDebut)
        .set('dateFin', dto.dateFin);   

        const route =  `${this.api}/${this.endpoint}`
        console.log("base route of api:", route)

        return this.http.get<FicheSuivieModel[]>(
            `${this.api}/${this.endpoint}`,{params}
        )
    }


}