import { Component, OnInit } from '@angular/core';
import { CrudPageComponent } from '../../shared/crud-page/crud-page';
import { AssignmentsService } from './services/assignment.service';
import { Assignment } from '../../core/models/assignment.model';

@Component({
  selector: 'app-assignments',
  imports: [CrudPageComponent],
  templateUrl: './assignments.html',
  styleUrl: './assignments.scss',
})
export class Assignments implements OnInit {
 constructor(private readonly assignmentsService: AssignmentsService) {}

 assignments: Assignment[] = [];

  columns = [

{ key:'enseignant', title:'Enseignant' },
{ key:'matiere', title:'Matière' },
{ key:'classe', title:'Classe' },
{ key:'status', title:'Etat' }
];

  ngOnInit(): void {
    this.loadAssignments();
  }

  loadAssignments() {
    this.assignmentsService.findAll().subscribe({
      next: (res) => {
        this.assignments = res as Assignment[];
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  create() {
    console.log('Créer');
  }

  edit(assignment: any) {
    console.log(assignment);
  }

  delete(assignment: any) {
    console.log(assignment);
  }
}
