import { ApiService } from "../../../core/services/api.service";

export class AssignmentsService extends ApiService{
    private endpoint = 'assignments-proposals';
    findAllOfficial(){
        return this.http.get(`${this.api}/${this.endpoint}/official`);
    }

}