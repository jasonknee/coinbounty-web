import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject(undefined);
  constructor() { }

  set(user: any) {
    this.userSubject.next(user);
  }
  get() {
   return this.userSubject.getValue();
  }
  watch() {
    return this.userSubject.asObservable();
  }
}
