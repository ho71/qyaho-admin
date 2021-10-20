import { Component } from '@angular/core';
import { Cus_num } from '../../models/cus.num';
import { CustomerNumService } from '../../services/customers_num.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-num',
  templateUrl: './customer-num.component.html',
  styleUrls: ['./customer-num.component.scss'],
})

export class CustomerNumComponent {
  customers: Cus_num[] = [];
  customersQuantity: number = 0;

  constructor(private customer1Service: CustomerNumService) {
    this.customer1Service.getCustomerNums().subscribe((data) => {
      this.customers = data;
      this.customersQuantity = data.length;
    });
  }

  deleteCustomer(id: string) {
    Swal.fire({
      title: '순번 삭제',
      text: '정말로 순번을 삭제 하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.value) {
        this.customer1Service.deleteCustomerNum(id);
        this.customers = this.customers.filter(
          (customer) => customer._id !== id
        );
        this.customersQuantity = this.customersQuantity - 1;
        Swal.fire('성공!', '예약이 취소 되었습니다.');
      }
    });
  }
}
