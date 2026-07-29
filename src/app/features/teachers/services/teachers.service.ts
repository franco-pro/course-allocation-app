import { Injectable } from "@angular/core";
import { Teacher } from "../../../core/models/teachers.model";
import { ApiService } from "../../../core/services/api.service";
import { SearchResponse } from "../../../core/models/searchResponse";
import { SearchTeacherDTO } from "../../../core/models/searchTeacherDTO";

@Injectable({
  providedIn: 'root',
})
export class TeachersService extends ApiService {

  private endpoint = 'teachers';

  override findAll<T = Teacher>() {
    return super.findAll<T>(this.endpoint);
  }

  override findOne<T = Teacher>(endpoint: string, id: string | number) {
    return super.findOne<T>(endpoint, id);
  }

  override create<T = Teacher>(...args: [dto: Partial<Teacher>] | [endpoint: string, dto: Partial<Teacher>]) {
    const [endpoint, dto] = args.length === 1 ? [this.endpoint, args[0]] : args;
    return super.create<T>(endpoint, dto);
  }

  override update<T = Teacher>(endpoint: string, id: string | number, dto: Partial<Teacher>) {
    return super.update<T>(endpoint, id, dto);
  }

   // On accepte un premier paramètre qui peut être l'id ou l'endpoint pour tromper le parent
  override delete<T = Teacher>(idOrEndpoint: string | number, id?: string | number) {
    if (typeof idOrEndpoint === 'string' && id !== undefined) {
      // Si l'appel respecte l'ordre du parent : delete(endpoint, id)
      return super.delete<T>(idOrEndpoint, id);
    } else {
      // Si l'appel utilise votre ordre personnalisé : delete(id)
      return super.delete<T>(this.endpoint, idOrEndpoint);
    }
  }

  searchTeachers(dto: SearchTeacherDTO) {
    return super.search<SearchResponse<Teacher>>(
      this.endpoint,
      dto
    );
  }
}