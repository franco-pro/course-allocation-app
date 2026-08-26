import { Injectable } from '@angular/core';

import { ApiService } from '../../../core/services/api.service';

import { Level } from '../../../core/models/level.model';
import { SearchResponse } from '../../../core/models/searchResponse';
import { SearchLevelDTO } from '../../../core/models/searchLevelDTO';

@Injectable({

    providedIn:'root'

})

export class LevelsService extends ApiService{

    endpoint='levels';

    override findAll<T=Level>(){

        return super.findAll<T>(this.endpoint);

    }

    searchLevels(dto: SearchLevelDTO){
        console.log(" searchLevels called with dto:", dto);
        return super.search<SearchResponse<Level>>(
            this.endpoint,
            dto
        );
    }

    getLevelById(id: string){
        return super.findOne<Level>(this.endpoint, id);
    }

}