import { Component, OnInit } from '@angular/core';
import { Teacher } from '../../core/models/teachers.model';
import { TeachersService } from './services/teachers.service';
import { CrudPageComponent } from '../../shared/crud-page/crud-page';
import { AcademicContextComponent } from '../../shared/academic-context/academic-context';

@Component({
  selector: 'app-teachers',
  imports: [CrudPageComponent, AcademicContextComponent],
  templateUrl: './teachers.html',
  styleUrl: './teachers.scss',
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  columns = [
    { key:'matricule', title:'Matricule' },
    { key:'nom', title:'Nom' },
    { key:'prenom', title:'Prénom' },
    { key:'grade', title:'Grade' }
  ];

  constructor(private readonly teachersService: TeachersService) {}
  ngOnInit(): void {
    this.loadTeachers();
  }

  loadTeachers() {
    this.teachersService.findAll().subscribe({
      next: (res) => {
        console.log('teachers get', res);
        this.teachers = res as Teacher[];
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  create() {
    console.log('Créer');
  }

  edit(teacher: any) {
    console.log(teacher);
  }

  delete(teacher: any) {
    console.log(teacher);
  }
}
