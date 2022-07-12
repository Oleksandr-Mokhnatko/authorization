import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '../types/user-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  userEmail: string = 'test@test';
  userPass: string = 'testtest';
  isAuth: boolean = false;

  logout(): void {
    this.isAuth = false;
  }

  isAuthenticated(): boolean {
    return this.isAuth;
  }

  login(userData: UserInterface): Observable<any> {
    return new Observable((observer) => {
      if (
        userData.email === this.userEmail &&
        userData.password === this.userPass
      ) {
        this.isAuth = true;
        observer.next();
        observer.complete();
      } else {
        observer.error('Wrong Email or Password');
      }
    });
  }
}
