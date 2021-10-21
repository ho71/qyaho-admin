import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Cus_num } from '../../models/cus.num';
import { CustomerNumService } from '../../services/customers_num.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  business = Object;
  customers: Cus_num[] = [];
  customersQuantity: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private customer1Service: CustomerNumService
  ) {}

  ngOnInit() {
    this.authService.getProfile().subscribe(
      (profile) => {
        this.business = profile.user;
      },
      (err) => {
        console.log(err);
        return false;
      }
    );

    setInterval(() => {
      this.customer1Service.getCustomerNums().subscribe((data) => {
        this.customers = data;
        this.customersQuantity = data.length;
      });
    }, 1000);
  }

  onLogoutClick() {
    this.authService.logout();
    Swal.fire({
      title: '로그아웃 성공! ',
      icon: 'success',
      confirmButtonText: '확인',
    });
    this.router.navigate(['/login']);
    return false;
  }
  checkLoggedIn() {
    return this.authService.loggedIn();
  }
}
