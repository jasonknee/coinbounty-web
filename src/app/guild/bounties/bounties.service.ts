import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'platform'
})
export class BountiesService {
//   private userSubject = new BehaviorSubject(undefined);
  constructor(private http: HttpClient) { }

  sayHello() {
      return this.http.get(`https://r0vik0dztf.execute-api.us-east-1.amazonaws.com/prod/hello`);
  }

//   set(user: any) {
//     this.userSubject.next(user);
//   }
//   get() {
//    return this.userSubject.getValue();
//   }
//   watch() {
//     return this.userSubject.asObservable();
//   }
}
