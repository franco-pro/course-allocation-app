import { Injectable, signal } from '@angular/core';

import { ClassesService } from '../../../features/classes/services/classes.service';
import { SubjectsService } from '../../../features/matieres/services/matiere.service';
import { TeachersService } from '../../../features/teachers/services/teachers.service';
import { SchoolYearsService } from '../../../features/year/services/year.service';
import { LevelsService } from '../../../features/levels/services/level.service';

import { SelectOption } from '../models/academic-context-options.interface';
import { AcademicContextStore } from '../stores/academic-context.store';
import { FiliereService } from '../../../features/filiere/services/filiere.service';

import {
  AcademicContextConfig,
  DEFAULT_ACADEMIC_CONTEXT_CONFIG,
} from '../models/academic-context-config';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AcademicContextService {
  constructor(
    private store: AcademicContextStore,

    private academicYearService: SchoolYearsService,

    private classService: ClassesService,

    private subjectService: SubjectsService,

    private teacherService: TeachersService,

    private levelService: LevelsService,

    private filiereService: FiliereService,
  ) {}

  readonly years = signal<SelectOption<string>[]>([]);

  readonly levels = signal<SelectOption<number>[]>([]);

  readonly classes = signal<SelectOption<number>[]>([]);

  readonly subjects = signal<SelectOption<number>[]>([]);

  readonly teachers = signal<SelectOption<string>[]>([]);

  readonly filieres = signal<SelectOption<number>[]>([]);

  private config: AcademicContextConfig = DEFAULT_ACADEMIC_CONTEXT_CONFIG;

  initialize(config: AcademicContextConfig): void {
    this.config = config;

    this.loadAcademicYears().subscribe();

    this.loadFilieres().subscribe();

    if (!this.config.levelRequiresFiliere) {
      this.loadLevels().subscribe();
    }

    if (!this.config.classRequiresLevel) {
      this.loadClasses().subscribe();
    }

    if (!this.config.subjectRequiresClass) {
      this.loadSubjects().subscribe();
    }

    if (!this.config.teacherRequiresSubject) {
      this.loadTeachers().subscribe();
    }
  }

  reset(): void {
    this.store.reset();

    this.levels.set([]);

    this.classes.set([]);

    this.subjects.set([]);

    this.teachers.set([]);

    this.filieres.set([]);
  }

  changeAcademicYear(id: string | null): void {
    this.store.update({
      academicYearId: id,
    });
  }

  changeFiliere(id: number | null): void {
    this.store.update({
      filiereId: id,

      levelId: null,

      classIds: [],

      subjectId: null,

      teacherMatricule: null,
    });

    this.levels.set([]);

    this.classes.set([]);

    this.subjects.set([]);

    if (this.config.teacherRequiresSubject) {
    this.teachers.set([]);
}

    if (!id) {
      if (!this.config.levelRequiresFiliere) {
        this.loadLevels().subscribe();
      }

      return;
    }

    this.loadLevels(id).subscribe();
  }

  changeLevel(id: number | null): void {
    this.store.update({
      levelId: id,

      classIds: [],

      subjectId: null,

      teacherMatricule: null,
    });

    this.classes.set([]);

    this.subjects.set([]);

    if (this.config.teacherRequiresSubject) {
    this.teachers.set([]);
}

    if (!id) {
      if (!this.config.classRequiresLevel) {
        this.loadClasses().subscribe();
      }

      return;
    }

    this.loadClasses(id).subscribe();
  }

  changeClass(value: number | number[] | null): void {
    const classIds = value == null ? [] : Array.isArray(value) ? value : [value];

    this.store.update({
      classIds,

      subjectId: null,

      teacherMatricule: null,
    });

    this.subjects.set([]);

    if (this.config.teacherRequiresSubject) {
    this.teachers.set([]);
}

    if (classIds.length === 0) {
      if (!this.config.subjectRequiresClass) {
        this.loadSubjects().subscribe();
      }

      return;
    }

    this.loadSubjects(classIds).subscribe();
  }

 changeSubject(id: number | null): void {

  this.store.update({
    subjectId: id,

    teacherMatricule: this.config.teacherRequiresSubject
      ? null
      : this.store.teacherMatricule(),
  });

  if (!this.config.teacherRequiresSubject) {
    return;
  }

  this.teachers.set([]);

  if (!id) {
    this.loadTeachers().subscribe();
    return;
  }

  this.loadTeachers(id).subscribe();
}

  changeTeacher(matricule: string | null): void {
    this.store.update({
      teacherMatricule: matricule,
    });
  }

  private loadAcademicYears() {
    return this.academicYearService
      .findAll().pipe(

      tap(response => {

    const years = response.map(year => ({

        value: year.id_annee,

        label: year.id_annee,

    }));

    this.years.set(years);

    if (
        !this.store.academicYearId() &&
        years.length
    ) {

        this.store.update({

            academicYearId: years[years.length - 1].value,

        });

    }

}));
  }

  private loadFilieres() {
    return this.filiereService
      .searchFilieres({
        page: 1,
        limit: 100,
      }).pipe(

      tap((response) => {
        this.filieres.set(
          response.data.map((filiere) => ({
            value: filiere.id_filiere,

            label: filiere.abbrev,
          })),
        );
      }));
  }

  private loadLevels(filiereId?: number){
    return this.levelService
      .searchLevels({
        page: 1,
        limit: 100,
        filiereId,
      }).pipe(
      tap((response) => {
        this.levels.set(
          response.data.map((level) => ({
            value: level.id_niveau,

            label: level.nom,
          })),
        );
      }));
  }

  private loadClasses(levelId?: number){
    return this.classService
      .searchClasses({
        page: 1,

        limit: 1000,

        levelId,
      }).pipe(

      tap((response) => {
        this.classes.set(
          response.data.map((classe) => ({
            value: classe.id_classe,

            label: classe.nom,
          })),
        );
      }));
  }

  private loadSubjects(classIds?: number[]) {
    const payload = {
      page: 1,
      limit: 1000,
      classIds,
    };
    console.log('Searching subjects with payload:', payload);
    return this.subjectService
      .searchSubjects(payload).pipe(

      tap((response) => {
        console.log('Subjects response:', response);
        this.subjects.set(
          response.data.map((subject) => ({
            value: subject.id_matiere,

            label: subject.nom + ' (' + subject.volumeCM
 + 'H)',
          })),
        );
      }));
  }

  private loadTeachers(subjectId?: number){
    return this.teacherService
      .searchTeachers({
        page: 1,

        limit: 1000,

        subjectId,
      }).pipe(

      tap((response) => {
        this.teachers.set(
          response.data.map((teacher) => ({
            value: teacher.matricule,

            label: `${teacher.nom} ${teacher.prenom}`,
          })),
        );
      }));
  }
}
