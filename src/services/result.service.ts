// import { IResult } from "../interfaces/result.interface";
// // import Result from "../models/result.model";
// import { GetREGCourses } from "./registered_course.service";

// export const generateResult = async (data: Partial<IResult>) => {
//   const { student_id, session_id } = data;

//   const filter = { student_id: student_id, session_id: session_id };
//   const courses = await GetREGCourses(filter);

//   let total_score: number = 0;
//   let total_unit: number = 0;
//   for (const scores of courses) {
//     total_score += scores.total_score ?? 0;
//     total_unit += scores.unit ?? 0;
//   }

//   //   const gpa = total_score;
// };
