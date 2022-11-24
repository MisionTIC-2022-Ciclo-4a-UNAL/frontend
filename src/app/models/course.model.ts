import { Department } from "./department.model";

export class Course {
    _id?: string;
    name?: string;
    credits?: number;
    department?: Department;
}
