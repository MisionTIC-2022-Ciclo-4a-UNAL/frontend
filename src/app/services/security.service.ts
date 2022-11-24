import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  user = new BehaviorSubject<User>(new User());
  
  /**
   * 
   * @param http 
   */
  constructor(private http: HttpClient) {
    this.verifyCurrentSession();
  }

  /**
   * 
   */
  public get userCurrentSession(): User {
    return this.user.value;
  }
  
  /**
   * 
   * @returns 
   */
  public getUser(){
    return this.user.asObservable();
  }

  /**
   * 
   * @param user_ 
   */
  public setUser(user_: User){
    this.user.next(user_);
  }

  /**
   * 
   * @param user 
   * @returns 
   */
  public validateLogin(user: User): Observable<User>{
    return this.http.post<User>(`${environment.url_api_gateway}/login`, user);
  }

  /**
   * 
   * @param sessionData 
   */
  public saveSessionData(sessionData: any){
    let userData: User = {
      id: sessionData.user_id,
      token: sessionData.token,
    };
    localStorage.setItem('session', JSON.stringify(userData));
    this.setUser(userData);
  }

  /**
   * 
   * @returns 
   */
  public getSessionData(): any {
    let currentSession = localStorage.getItem('session');
    return currentSession;
  }

  /**
   * 
   */
  public verifyCurrentSession(){
    let currentSession = localStorage.getItem('session');
    if(currentSession)
      this.setUser(JSON.parse(currentSession));
  }

  /**
   * 
   */
  public isThereSession(){
    let currentSession = localStorage.getItem('session');
    return (currentSession) ? true : false; 
  }


  /**
   * 
   */
  public logout(){
    localStorage.removeItem('session');
    this.setUser(new User());
  }
}
