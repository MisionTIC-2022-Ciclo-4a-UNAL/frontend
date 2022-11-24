import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns 
   */
  studentsReport() {
    return this.http.get(`${environment.url_api_gateway}/reports/student_enrollments/all`);
  }

  /**
   * 
   * @param studentId 
   * @returns 
   */
  studentReport(studentId: string) {
    return this.http.get(`${environment.url_api_gateway}/reports/student_enrollments/${studentId}`);
  }

  /**
   * 
   * @returns 
   */
  studentsTopReport() {
    return this.http.get(`${environment.url_api_gateway}/reports/students_top_enrollments`);
  }

  /**
   * 
   * @returns 
   */
  coursesReport() {
    return this.http.get(`${environment.url_api_gateway}/reports/course_enrollments/all`);
  }

  /**
   * 
   * @param courseId 
   * @returns 
   */
  courseReport(courseId: string) {
    return this.http.get(`${environment.url_api_gateway}/reports/course_enrollments/${courseId}`);
  }

  /**
   * 
   * @returns 
   */
  deparmentsReport(){
    return this.http.get(`${environment.url_api_gateway}/reports/department_enrollments`);
  }

  /**
   * 
   * @returns 
   */
  distributionReport(){
    return this.http.get(`${environment.url_api_gateway}/reports/department_distribution`);
  }
}
