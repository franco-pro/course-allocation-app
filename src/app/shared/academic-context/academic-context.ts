import { Component, OnInit } from '@angular/core';

import { AcademicContextStore } from './stores/academic-context.store';
import { AcademicContextService } from './services/academic-context.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-academic-context',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './academic-context.html',
  styleUrls: ['./academic-context.scss'],
})
export class AcademicContextComponent implements OnInit {

  constructor(
    public readonly store: AcademicContextStore,
    public readonly service: AcademicContextService,
  ) {}

  ngOnInit(): void {

    this.service.initialize();

  }

  changeAcademicYear(id: string | null): void {

    this.service.changeAcademicYear(id);

  }

  changeFiliere(id: number | null): void {

    this.service.changeFiliere(id);

  }

  changeLevel(id: number | null): void {

    this.service.changeLevel(id);

  }

  changeClass(id: number | null): void {

    this.service.changeClass(id);

  }

  changeSubject(id: number | null): void {

    this.service.changeSubject(id);

  }

  changeTeacher(matricule: string | null): void {

    this.service.changeTeacher(matricule);

  }

  reset(): void {

    this.service.reset();

  }

}