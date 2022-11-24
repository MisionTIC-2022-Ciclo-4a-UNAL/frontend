import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  /**
   * 
   * @returns 
   */
  list(): Observable<User[]>{
    return this.http.get<User[]>(`${environment.url_api_gateway}/users`);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  getOne(id: number): Observable<User>{
    return this.http.get<User>(`${environment.url_api_gateway}/user/${id}`);
  }

  /**
   * 
   * @param user 
   * @returns 
   */
  create(user: User){
    return this.http.post<User>(`${environment.url_api_gateway}/user/insert`, user);
  }

  /**
   * 
   * @param id 
   * @param user 
   * @returns 
   */
  edit(id: number, user: User){
    return this.http.put<User>(`${environment.url_api_gateway}/user/update/${id}`, user);
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  delete(id: number){
    return this.http.delete(`${environment.url_api_gateway}/user/delete/${id}`);
  }
}
