export interface proposalListDto {
  id: number;
  enseignantMatricule: string;
  matiereId: number;
  anneeId: number;
  classeIds: number[];
  status: string;
}
