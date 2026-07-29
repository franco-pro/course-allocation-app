export interface Subject {
  id_matiere: number;
  CODE_MATIERE: string;
  nom: string;
  volumeCM: number;
  volumeTD?: number;
  volumeTP?: number;
  semestre?: string;
}