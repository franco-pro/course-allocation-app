import { Injectable, signal } from '@angular/core';
import { ClassesService } from '../../../features/classes/services/classes.service';
import { SubjectsService } from '../../../features/matieres/services/matiere.service';
import { TeachersService } from '../../../features/teachers/services/teachers.service';
import { SchoolYearsService } from '../../../features/year/services/year.service';
import { LevelsService } from '../../../features/levels/services/level.service';
import { SelectOption } from '../models/academic-context-options.interface';
import { AcademicContextStore } from '../stores/academic-context.store';
import { FiliereService } from '../../../features/filiere/services/filiere.service';

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

  initialize(): void {
    this.loadAcademicYears();

    this.loadFilieres();
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


  changeLevel(id: number | null): void {
    this.store.update({
      levelId: id,

      classId: null,

      subjectId: null,

      teacherMatricule: null,
    });

    this.classes.set([]);

    this.subjects.set([]);

    this.teachers.set([]);

    if (!id) {
      return;
    }

    this.loadClasses(id);
  }

  changeClass(id: number | null): void {
    this.store.update({
      classId: id,

      subjectId: null,

      teacherMatricule: null,
    });

    this.subjects.set([]);

    this.teachers.set([]);

    if (!id) {
      return;
    }

    this.loadSubjects(id);
  }

  changeSubject(id: number | null): void {
    this.store.update({
      subjectId: id,

      teacherMatricule: null,
    });

    this.teachers.set([]);

    if (!id) {
      return;
    }

    this.loadTeachers(id);
  }

  changeTeacher(matricule: string | null): void {
    this.store.update({
      teacherMatricule: matricule,
    });
  }

  //private methods to load data from services

  private loadAcademicYears(): void {
    this.academicYearService.findAll().subscribe((response) => {
      console.log('Academic years loaded:', response);
      this.years.set(
        response.map((year) => ({
          value: year.id_annee,
          label: year.id_annee,
        })),
      );
    });
  }

 

  private loadLevels(filiereId: number): void {
    this.levelService
      .searchLevels({
        page: 1,
        limit: 100,
        filiereId,
      })
      .subscribe((response) => {
        console.log('Levels loaded for filiere', filiereId, ':', response);
        this.levels.set(
          response.data.map((level) => ({
            value: level.id_niveau,
            label: level.nom,
          })),
        );
      });
  }

  private loadClasses(levelId: number): void {
    this.classService
      .searchClasses({
        page: 1,
        limit: 1000,
        levelId,
      })
      .subscribe((response) => {
        this.classes.set(
          response.data.map((classe) => ({
            value: classe.id_classe,
            label: classe.nom,
          })),
        );
      });
  }

  private loadSubjects(classId: number): void {
    const context = this.store.context();

    this.subjectService
      .searchSubjects({
        page: 1,
        limit: 1000,
        classId,
      })
      .subscribe((response) => {
        this.subjects.set(
          response.data.map((subject) => ({
            value: subject.id_matiere,
            label: subject.nom,
          })),
        );
      });
  }

  private loadTeachers(subjectId: number): void {
    const context = this.store.context();

    this.teacherService
      .searchTeachers({
        page: 1,
        limit: 1000,
        subjectId,
      })
      .subscribe((response) => {
        this.teachers.set(
          response.data.map((teacher) => ({
            value: teacher.matricule,
            label: `${teacher.nom} ${teacher.prenom}`,
          })),
        );
      });
  }

  private loadFilieres(): void {
    this.filiereService
      .searchFilieres({
        page: 1,

        limit: 100,
      })
      .subscribe((response) => {
        console.log('Filieres loaded:', response);
        this.filieres.set(
          response.data.map((filiere) => ({
            value: filiere.id_filiere,

            label: filiere.abbrev,
          })),
        );
      });
  }

  changeFiliere(id: number | null): void {
    this.store.update({
      filiereId: id,

      levelId: null,

      classId: null,

      subjectId: null,

      teacherMatricule: null,
    });

    this.levels.set([]);

    this.classes.set([]);

    this.subjects.set([]);

    this.teachers.set([]);

    if (!id) {
      return;
    }

    this.loadLevels(id);
  }
}
