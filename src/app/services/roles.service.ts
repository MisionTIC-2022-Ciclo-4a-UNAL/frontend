import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Rol } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns 
   */
  list(): Observable<Rol[]>{
    return this.http.get<Rol[]>(`${environment.url_api_gateway}/rols`);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  getOne(id: number): Observable<Rol>{
    return this.http.get<Rol>(`${environment.url_api_gateway}/rol/${id}`);
  }

  /**
   * 
   * @param rol
   * @returns 
   */
  create(rol: Rol){
    return this.http.post<Rol>(`${environment.url_api_gateway}/rol/insert`, rol);
  }

  /**
   * 
   * @param id 
   * @param rol 
   * @returns 
   */
  edit(id: number, rol: Rol){
    return this.http.put<Rol>(`${environment.url_api_gateway}/rol/update/${id}`, rol);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  delete(id: number){
    return this.http.delete(`${environment.url_api_gateway}/rol/delete/${id}`);
  }
}
