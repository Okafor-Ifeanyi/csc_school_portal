export enum Semester {
  FIRST_SEMESTER = "Harmattan Semester",
  SECOND_SEMESTER = "Rain semester",
}

export interface ISession {
  name: string;
  is_current_session: boolean;
  semester: Semester;
  year?: number;
  is_deleted: boolean;
}
