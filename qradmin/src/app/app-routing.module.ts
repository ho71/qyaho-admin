import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CustomerNumComponent} from './components/customer-num/customer-num.component';
import { BusinessComponent } from './components/business/business.component';
import { BusinessloginComponent } from './components/businesslogin/businesslogin.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { QrscanComponent } from './components/Qrscan/qrscan.component';
import { Qrscan1Component } from './components/qrscan1/qrscan1.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'Customer_Num', component: CustomerNumComponent },
  { path: 'business', component: BusinessComponent },
  { path: 'businesslogin', component: BusinessloginComponent },
  { path: 'Customer_list', component: CustomerListComponent },
  { path: 'qrscan', component: QrscanComponent },
  { path: 'qrscan1', component: Qrscan1Component },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
