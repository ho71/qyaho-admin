import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { OwlModule } from 'ngx-owl-carousel';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerNumComponent } from './components/customer-num/customer-num.component';
import { BusinessComponent } from './components/business/business.component';
import { BusinessloginComponent } from './components/businesslogin/businesslogin.component';
import { QrscanComponent } from './components/Qrscan/qrscan.component';
import { PicSlideComponent } from './components/pic-slide/pic-slide.component';
import { FooterComponent } from './components/footer/footer.component';
import { DialogComponent } from './components/dialog/dialog.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CustomerListComponent,
    CustomerNumComponent,
    BusinessComponent,
    BusinessloginComponent,
    QrscanComponent,
    PicSlideComponent,
    FooterComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxQRCodeModule,
    TooltipModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    OwlModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('id_token');
        },
      },
    }),
    NgxMaskModule.forRoot(maskConfig),
  ],
  providers: [ValidateService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
