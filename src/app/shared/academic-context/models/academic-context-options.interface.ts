export interface SelectOption<T = number | string> {
  value: T;

  label: string;
}
export interface AcademicContextOptions {
  academicYears: SelectOption<string>[];

  departments: SelectOption<number>[];
  levels: SelectOption<number>[];

  classes: SelectOption<number>[];

  subjects: SelectOption<number>[];

  teachers: SelectOption<string>[];

  filieres: SelectOption<number>[];
}
