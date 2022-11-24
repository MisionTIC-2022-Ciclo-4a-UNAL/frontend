import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns 
   */
  list(): Observable<Student[]>{
    return this.http.get<Student[]>(`${environment.url_api_gateway}/students`);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  getOne(id: string): Observable<Student>{
    return this.http.get<Student>(`${environment.url_api_gateway}/student/${id}`);
  }

  /**
   * 
   * @param student 
   * @returns 
   */
  create(student: Student){
    return this.http.post<Student>(`${environment.url_api_gateway}/student/insert`, student);
  }

  /**
   * 
   * @param id 
   * @param student 
   * @returns 
   */
  edit(id: string, student: Student){
    return this.http.put<Student>(`${environment.url_api_gateway}/student/update/${id}`, student);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  delete(id: string){
    return this.http.delete(`${environment.url_api_gateway}/student/delete/${id}`);
  }
}
