import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/User';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
//회원 목록
@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  constructor(private http: HttpClient) {}

  prepEndpoint(ep) {
    // 1. localhost에 포팅시
    // return 'http://localhost:3000/' + ep;

    // 2. Heroku 클라우드 서버에 포팅시
    return ep;
  }

  API_URL: string = this.prepEndpoint('users/cus_list/');

  getCustomers() {
    return this.http.get<User[]>(this.API_URL, httpOptions);
  }

  deleteCustomer(id: string) {
    return this.http
      .delete<User>(this.API_URL + `${id}`, httpOptions)
      .subscribe();
  }
}
