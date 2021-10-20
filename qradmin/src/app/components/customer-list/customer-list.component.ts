import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { CustomersService } from '../../services/customers.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {
  customers: User[] = [];
  customersQuantity: number = 0;

  constructor(private customersService: CustomersService) {}

  ngOnInit() {
    this.customersService.getCustomers().subscribe((data) => {
      this.customers = data;
      this.customersQuantity = data.length;
    });
  }

  //회원 삭제
  deleteCustomer(id: string) {
    Swal.fire({
      title: '회원 삭제',
      text: '정말로 회원을 삭제 하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '확인',
    }).then((result) => {
      if (result.value) {
        this.customersService.deleteCustomer(id);
        this.customers = this.customers.filter(
          (customer) => customer._id !== id
        );
        this.customersQuantity = this.customersQuantity - 1;
        Swal.fire('성공!', '회원을 정상적으로 삭제했습니다.', 'success');
      }
    });
  }
}
