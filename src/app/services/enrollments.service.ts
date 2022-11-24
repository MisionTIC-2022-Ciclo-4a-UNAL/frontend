import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Enrollment } from '../models/enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentsService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns 
   */
  list(): Observable<Enrollment[]>{
    return this.http.get<Enrollment[]>(`${environment.url_api_gateway}/enrollments`);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  getOne(id: string): Observable<Enrollment>{
    return this.http.get<Enrollment>(`${environment.url_api_gateway}/enrollment/${id}`);
  }

  /**
   * 
   * @param enrollment 
   * @returns 
   */
  create(enrollment: Enrollment){
    return this.http.post<Enrollment>(`${environment.url_api_gateway}/enrollment/insert`, enrollment);
  }

  /**
   * 
   * @param id 
   * @param enrollment 
   * @returns 
   */
  edit(id: string, enrollment: Enrollment){
    return this.http.put<Enrollment>(`${environment.url_api_gateway}/enrollment/update/${id}`, enrollment);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  delete(id: string){
    return this.http.delete(`${environment.url_api_gateway}/enrollment/delete/${id}`);
  }
}
