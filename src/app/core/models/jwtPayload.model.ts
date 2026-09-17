export interface JwtPaloadModel{
sub: string;
  matricule: string;
  isTeacher: number;
  roles: string[];
  departementId?: number | null;
  iat?: number;
  exp?: number;
}