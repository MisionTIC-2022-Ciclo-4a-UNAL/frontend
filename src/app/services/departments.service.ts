import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns 
   */
  list(): Observable<Department[]>{
    return this.http.get<Department[]>(`${environment.url_api_gateway}/departments`);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  getOne(id: string): Observable<Department>{
    return this.http.get<Department>(`${environment.url_api_gateway}/department/${id}`);
  }

  /**
   * 
   * @param department 
   * @returns 
   */
  create(department: Department){
    return this.http.post<Department>(`${environment.url_api_gateway}/department/insert`, department);
  }

  /**
   * 
   * @param id 
   * @param department
   * @returns 
   */
  edit(id: string, department: Department){
    return this.http.put<Department>(`${environment.url_api_gateway}/department/update/${id}`, department);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  delete(id: string){
    return this.http.delete(`${environment.url_api_gateway}/department/delete/${id}`);
  }
}
