import { AssignmentStatus } from "./assignement-enum.model";


export interface AssignmentProposalInterface {
  id:number;
  enseignantMatricule:string;
  matiereId:number;
  anneeId:string;
  proposedBy:string;
  proposedAt:Date;
  validatedBy?:string;
  validatedAt?:Date;
  rejectionReason?:string;
  status:AssignmentStatus;
}