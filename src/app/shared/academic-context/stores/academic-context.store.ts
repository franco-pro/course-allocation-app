import { Injectable, computed, signal } from '@angular/core';

import { AcademicContext } from '../models/academic-context.interface';

@Injectable({
  providedIn: 'root',
})
export class AcademicContextStore {
  readonly context = signal<AcademicContext>({
    academicYearId: null,
    filiereId: null,
    levelId: null,
    classIds: [],
    subjectId: null,
    teacherMatricule: null,
  });

  readonly academicYearId = computed(() => this.context().academicYearId);

  readonly filiereId = computed(() => this.context().filiereId);

  readonly levelId = computed(() => this.context().levelId);

  readonly classIds = computed(() => this.context().classIds);

  readonly subjectId = computed(() => this.context().subjectId);

  readonly teacherMatricule = computed(() => this.context().teacherMatricule);

  update(partial: Partial<AcademicContext>): void {
    this.context.update((context) => ({
      ...context,

      ...partial,
    }));
  }

  reset(): void {
    this.context.set({
      academicYearId: null,

      filiereId: null,

      levelId: null,

      classIds: [],

      subjectId: null,

      teacherMatricule: null,
    });
  }
}
