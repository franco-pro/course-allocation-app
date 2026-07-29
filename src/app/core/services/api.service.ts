import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  protected http = inject(HttpClient);
  protected readonly api = environment.apiUrl;

  findAll<T>(endpoint?: string) {
    return this.http.get<T[]>(`${this.api}/${endpoint}`);
  }

  search<T>(
    endpoint: string,
    params?: Record<string, any>,
) {
    return this.http.get<T>(
        `${this.api}/${endpoint}/search`,
        {
            params,
        }
    );
}

  findOne<T>(endpoint: string, id: string | number) {
    return this.http.get<T>(`${this.api}/${endpoint}/${id}`);
  }

  create<T>(endpoint: string, body: any) {
    return this.http.post<T>(`${this.api}/${endpoint}`, body);
  }

  update<T>(endpoint: string, id: string | number, body: any) {
    return this.http.patch<T>(`${this.api}/${endpoint}/${id}`, body);
  }

  delete<T>(  endpoint: string, id: string | number) {
    return this.http.delete<T>(`${this.api}/${endpoint}/${id}`);
  }
}