import { Component, OnInit } from '@angular/core';
import { AssignmentValidation } from '../../core/models/assignenment-validation';
import { AssignmentsService } from './services/validations.service';
import { CrudPageComponent } from '../../shared/crud-page/crud-page';

@Component({
  selector: 'app-validation',
  imports: [CrudPageComponent],
  templateUrl: './validation.html',
  styleUrl: './validation.scss',
})
export class Validation implements OnInit {
  constructor(private readonly assignmentsService: AssignmentsService) {}
  validations: AssignmentValidation[] = [];

  columns = [
{ key:'enseignant', title:'Enseignant' },
{ key:'validatedBy', title:'Validé par' },
{ key:'decision', title:'Décision' },
{ key:'validatedAt', title:'Date' }
];
  ngOnInit(): void {
    this.loadValidations();
  }

  loadValidations() {
    this.assignmentsService.findAll().subscribe({
      next: (res) => {
        this.validations = res as AssignmentValidation[];
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  create() {
    console.log('Créer');
  }

  edit(validation: any) {
    console.log(validation);
  }

  delete(validation: any) {
    console.log(validation);
  }

}
