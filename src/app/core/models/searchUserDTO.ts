import { searchDTO } from "./searchDTO";

export interface SearchUserDto extends searchDTO {
  actif?: boolean;
}