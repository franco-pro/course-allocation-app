import { AssignmentProposalInterface } from "../../../../core/models/assignment-proposal.model";
import { ApiService } from "../../../../core/services/api.service";

export class PendingValidationsService extends ApiService{

    private endpoint = 'assignment-proposals';
   

findPending(){
  return this.http.get<AssignmentProposalInterface[]>(
    `${this.api}/${this.endpoint}/pending`
  );
}

submit(id:number){
  return this.http.post(
    `${this.api}/${this.endpoint}/${id}/submit`,
    {}
  );
}

validate(id:number, comment:string){
  return this.http.post(
    `${this.api}/${this.endpoint}/${id}/validate`,
    {
      comment
    }
  );
}

reject(id:number, comment:string){
  return this.http.post(
    `${this.api}/${this.endpoint}/${id}/reject`,
    {
      comment
    }
  );
}
}