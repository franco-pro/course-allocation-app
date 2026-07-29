import { Injectable } from "@angular/core";
import { ApiService } from "../../../core/services/api.service";
import { SchoolYear } from "../../../core/models/year.model";

@Injectable({
  providedIn: 'root'
})
export class SchoolYearsService extends ApiService {

  endpoint = 'school-years';

  override findAll<T=SchoolYear>() {
    return super.findAll<T>(this.endpoint);
  }


}