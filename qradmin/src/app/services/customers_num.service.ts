import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cus_num } from '../models/cus.num';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

//대기 순번
@Injectable({
  providedIn: 'root',
})
export class CustomerNumService {
  prepEndpoint(ep) {
    // 1. localhost에 포팅시
    // return 'http://localhost:3000/' + ep;

    // 2. Heroku 클라우드 서버에 포팅시
    return ep;
  }

  constructor(private http: HttpClient) {}

  getCustomerNums() {
    const getCustomer = this.prepEndpoint('cusnum/cus_nums');
    return this.http.get<Cus_num[]>(getCustomer, httpOptions);
  }

  addCustomerNum(Cus_num: Cus_num): Observable<any> {
    const addCustomer = this.prepEndpoint('cusnum/cus_nums');
    return this.http.post<Cus_num>(addCustomer, Cus_num, httpOptions);
  }

  addCustomer1Num(Cus_num: Cus_num): Observable<any> {
    const addCustomer1 = this.prepEndpoint('cusnum/cus_nums1');
    return this.http.post<Cus_num>(addCustomer1, Cus_num, httpOptions);
  }

  deleteCustomerNum(id: string) {
    const deleteCustomer = this.prepEndpoint('cusnum/cus_nums/');
    return this.http
      .delete<Cus_num>(deleteCustomer + `${id}`, httpOptions)
      .subscribe();
  }
}
