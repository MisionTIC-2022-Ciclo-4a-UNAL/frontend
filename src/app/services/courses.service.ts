import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns 
   */
  list(): Observable<Course[]>{
    return this.http.get<Course[]>(`${environment.url_api_gateway}/courses`);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  getOne(id: string): Observable<Course>{
    return this.http.get<Course>(`${environment.url_api_gateway}/course/${id}`);
  }

  /**
   * 
   * @param course 
   * @returns 
   */
  create(course: Course){
    return this.http.post<Course>(`${environment.url_api_gateway}/course/insert`, course);
  }

  /**
   * 
   * @param id 
   * @param course 
   * @returns 
   */
  edit(id: string, course: Course){
    return this.http.put<Course>(`${environment.url_api_gateway}/course/update/${id}`, course);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  delete(id: string){
    return this.http.delete(`${environment.url_api_gateway}/course/delete/${id}`);
  }
}
