import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { UserInterface } from '../../../core/models/user.model';
import {AssignmentProposalInterface} from '../../../core/models/assignment-proposal.model';
import { proposalListDto } from '../../../core/models/proposalListDto';
@Injectable({
  providedIn: 'root',
})


export class AssignmentProposalService extends ApiService {

  private endpoint = 'assignment-proposals';

  override findAll<AssignmentProposalInterface>() {
  return super.findAll<AssignmentProposalInterface>(this.endpoint);
}


submit(id: number) {
  console.log(`${this.api}/${this.endpoint}/${id}/submit`)
  return this.http.post(
    `${this.api}/${this.endpoint}/${id}/submit`,
    {}
  );
}

findPending() {
  return this.http.get<AssignmentProposalInterface[]>(`${this.api}/${this.endpoint}/pending`);
}

validate(id: number, body: { comment?: string }) {
  return this.http.post(
    `${this.api}/${this.endpoint}/${id}/validate`,
    body
  );
}

reject(id: number, body: { comment?: string }) {
  return this.http.post(
    `${this.api}/${this.endpoint}/${id}/reject`,
    body
  );
}

  override findOne<T = proposalListDto>(...args: [id: string | number] | [endpoint: string, id: string | number]) {
    const [endpoint, id] = args.length === 1 ? [this.endpoint, args[0]] : args;
    return super.findOne<T>(endpoint, id);
  }

  override create<T = UserInterface>(
    ...args: [dto: Partial<UserInterface>] | [endpoint: string, dto: Partial<UserInterface>]
  ) {
    const [endpoint, dto] = args.length === 1 ? [this.endpoint, args[0]] : args;
    return super.create<T>(endpoint, dto);
  }

  override update<T = UserInterface>(id: string | number, body: any, endpoint: string = this.endpoint) {
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