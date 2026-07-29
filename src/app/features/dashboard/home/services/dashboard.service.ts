import { Injectable, inject } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';

@Injectable({
  providedIn:'root'
})
export class DashboardService extends ApiService{


  getStats(){

    return this.http.get(`${this.api}/dashboard/stats`)

  }

}