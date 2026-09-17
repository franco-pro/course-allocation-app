// academic-context-config.interface.ts

export interface AcademicContextConfig {

  levelRequiresFiliere: boolean;
  classRequiresLevel: boolean;
  subjectRequiresClass: boolean;
  multipleClasses:boolean;

  /**
   * Si true, les enseignants sont chargés uniquement lorsqu'une matière est sélectionnée.
   * Si false, tous les enseignants sont chargés.
   */
  teacherRequiresSubject: boolean;
}

/**
 * Configuration par défaut.
 * Elle reproduit exactement le comportement actuel de AcademicContext.
 */
export const DEFAULT_ACADEMIC_CONTEXT_CONFIG: AcademicContextConfig = {
  levelRequiresFiliere: true,
  classRequiresLevel: true,
  subjectRequiresClass: true,
  teacherRequiresSubject: true,
    multipleClasses:true,
};