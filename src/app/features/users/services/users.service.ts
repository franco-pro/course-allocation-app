import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { UserInterface } from '../../../core/models/user.model';
import { SearchUserDto } from '../../../core/models/searchUserDTO';
import { SearchResponse } from '../../../core/models/searchResponse';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiService {

  private endpoint = 'users';

  override findAll<T = UserInterface>() {
    return super.findAll<T>(this.endpoint);
  }

   searchUsers(dto: SearchUserDto) {
    return super.search<SearchResponse<UserInterface>>(
      this.endpoint,
      dto,
    );
  }

  override findOne<T = UserInterface>(...args: [id: string | number] | [endpoint: string, id: string | number]) {
    const [endpoint, id] = args.length === 1 ? [this.endpoint, args[0]] : args;
    return super.findOne<T>(endpoint, id);
  }

  override create<T = UserInterface>(
    ...args: [dto: Partial<UserInterface>] | [endpoint: string, dto: Partial<UserInterface>]
  ) {
    const [endpoint, dto] = args.length === 1 ? [this.endpoint, args[0]] : args;
    return super.create<T>(endpoint, dto);
  }

  override update<T = UserInterface>(endpoint: string, id: string | number, body: any) {
    return super.update<T>(endpoint ?? this.endpoint, id, body);
  }

   // On accepte un premier paramètre qui peut être l'id ou l'endpoint pour tromper le parent
override delete<T = UserInterface>(idOrEndpoint: string | number, id?: string | number) {
  if (typeof idOrEndpoint === 'string' && id !== undefined) {
    // Si l'appel respecte l'ordre du parent : delete(endpoint, id)
    return super.delete<T>(idOrEndpoint, id);
  } else {
    // Si l'appel utilise votre ordre personnalisé : delete(id)
    return super.delete<T>(this.endpoint, idOrEndpoint);
  }
}
}