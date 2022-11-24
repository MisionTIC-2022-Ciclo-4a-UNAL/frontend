import { Course } from "./course.model";
import { Student } from "./student.model";

export class Enrollment {
    _id?: string;
    year?: number;
    semester?: number;
    grade?: number;
    student?: Student;
    course?: Course;
}
