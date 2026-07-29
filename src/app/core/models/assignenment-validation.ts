export interface AssignmentValidation {

  id:number;

  proposalId:number;

  validatedBy:string;

  decision:'APPROVED'|'REJECTED';

  comment?:string;

  validatedAt:Date;

}