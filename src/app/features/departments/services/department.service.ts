import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Department } from '../../../core/models/department.model';
import { SearchDepartmentDTO } from '../../../core/models/searchDepartmentDTO';
import { SearchResponse } from '../../../core/models/searchResponse';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService extends ApiService {

  endpoint = 'departments';

  override findAll<T = Department>() {
    return super.findAll<T>(this.endpoint);
  }

  searchDepartments(dto: SearchDepartmentDTO){
    return super.search<SearchResponse<Department>>(
      this.endpoint,
      dto
    );
  }

}