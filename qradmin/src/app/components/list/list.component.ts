import { Component, OnInit } from '@angular/core';
import { Cus_num } from '../../models/cus.num';
import { CustomerNumService } from '../../services/customers_num.service';

@Component({
  selector: 'app-list-num',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  customers: Cus_num[] = [];
  customersQuantity: number = 0;

  constructor(private customer1Service: CustomerNumService) {}

  ngOnInit() {
    setInterval(() => {
      this.customer1Service.getCustomerNums().subscribe((data) => {
        this.customers = data;
        this.customersQuantity = data.length;
      });
    }, 1000);
  }
}
