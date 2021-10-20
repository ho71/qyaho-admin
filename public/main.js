(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\user1\Desktop\qyahoadmin1014\qradmin\src\main.ts */"zUnb");


/***/ }),

/***/ "1MMG":
/*!*******************************************************!*\
  !*** ./src/app/components/Qrscan/qrscan.component.ts ***!
  \*******************************************************/
/*! exports provided: QrscanComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QrscanComponent", function() { return QrscanComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_qrscan_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./qrscan.component.html */ "NRKP");
/* harmony import */ var _qrscan_component_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./qrscan.component.css */ "Xihf");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var jsqr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jsqr */ "7Ozu");
/* harmony import */ var jsqr__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jsqr__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _services_customers_num_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/customers_num.service */ "Zfc8");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! sweetalert2 */ "PSD3");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_7__);








let QrscanComponent = class QrscanComponent {
    constructor(customer1Service, dialog) {
        this.customer1Service = customer1Service;
        this.dialog = dialog;
        this.no = 1;
    }
    toggleVideoMedia() {
        if (this.isActive()) {
            this.stopVideo();
            sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire({
                title: '카메라',
                text: '작동 중지',
                icon: 'success',
                confirmButtonText: '확인',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        }
        else {
            this.startVideo();
            sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire({
                title: '카메라',
                text: '작동 시작',
                timer: 2000,
                icon: 'success',
                confirmButtonText: '확인',
            });
        } //swal
    }
    startVideo() {
        navigator.mediaDevices
            .enumerateDevices()
            .then((mediaDeviceInfoList) => {
            console.log(mediaDeviceInfoList);
            const videoDevices = mediaDeviceInfoList.filter((deviceInfo) => deviceInfo.kind === 'videoinput');
            if (videoDevices.length === 0) {
                throw new Error('no video input devices');
            }
            return navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    deviceId: videoDevices[0].deviceId,
                    autoGainControl: true,
                    width: 960,
                    height: 640,
                },
            });
        })
            .then((mediaStream) => {
            this.stream = mediaStream;
            if (this.videoElement) {
                this.videoElement.nativeElement.srcObject = mediaStream;
                this.processImage();
            }
        })
            .catch((error) => {
            console.error(error);
        });
    }
    stopVideo() {
        if (this.stream) {
            this.stream.getVideoTracks()[0].stop();
        }
    }
    isActive() {
        return this.stream !== undefined && this.stream.active;
    }
    processImage() {
        if (this.videoElement && this.canvasElement && this.isActive()) {
            const width = this.canvasElement.nativeElement.width;
            const height = this.canvasElement.nativeElement.height;
            const context = this.canvasElement.nativeElement.getContext('2d');
            context.drawImage(this.videoElement.nativeElement, 0, 0, width, height);
            const imageData = context.getImageData(0, 0, width, height);
            //console.log(imageData);
            const qrcode = jsqr__WEBPACK_IMPORTED_MODULE_4___default()(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: 'dontInvert',
            });
            if (qrcode && qrcode.data.length !== 0) {
                const par = JSON.parse(qrcode.data);
                par.no = this.no;
                console.log(this.no);
                qrcode.data = JSON.stringify(par);
                this.manageSubmit(qrcode.data);
                setTimeout(() => {
                    this.processImage();
                }, 7000);
            }
            else {
                setTimeout(() => {
                    this.processImage();
                }, 3000);
            }
        }
    }
    manageSubmit(values) {
        this.customer1Service.addCustomerNum(values).subscribe((data) => {
            if (data.success) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire({
                    title: data.title,
                    text: data.msg,
                    icon: 'success',
                    confirmButtonText: '확인',
                });
                this.no += 1;
            }
            else {
                sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire({
                    title: data.title,
                    text: data.msg,
                    icon: 'error',
                    confirmButtonText: '확인',
                });
            }
        });
    }
};
QrscanComponent.ctorParameters = () => [
    { type: _services_customers_num_service__WEBPACK_IMPORTED_MODULE_6__["CustomerNumService"] },
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialog"] }
];
QrscanComponent.propDecorators = {
    videoElement: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['video',] }],
    canvasElement: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['canvas',] }]
};
QrscanComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-qrscan',
        template: _raw_loader_qrscan_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_qrscan_component_css__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], QrscanComponent);



/***/ }),

/***/ "2iP8":
/*!***********************************************************!*\
  !*** ./src/app/components/qrscan1/qrscan1.component.scss ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".mat-icon-button.start {\n  width: 75px;\n  height: 75px;\n  line-height: 48px;\n  background-color: lightgrey;\n}\n.mat-icon-button.start .mat-icon.start {\n  font-size: 60px;\n  width: 75px;\n  height: 50px;\n  line-height: 48px;\n}\n.mat-icon-button.stop {\n  width: 75px;\n  height: 75px;\n  line-height: 48px;\n  background-color: grey;\n}\n.mat-icon-button.stop .mat-icon.stop {\n  font-size: 60px;\n  width: 75px;\n  height: 50px;\n  line-height: 48px;\n  color: lightgrey;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcLi5cXC4uXFxxcnNjYW4xLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLDJCQUFBO0FBQ0Y7QUFBRTtFQUNFLGVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0FBRUo7QUFDQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxzQkFBQTtBQUVGO0FBREU7RUFDRSxlQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FBR0oiLCJmaWxlIjoicXJzY2FuMS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXQtaWNvbi1idXR0b24uc3RhcnQge1xyXG4gIHdpZHRoOiA3NXB4O1xyXG4gIGhlaWdodDogNzVweDtcclxuICBsaW5lLWhlaWdodDogNDhweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyZXk7XHJcbiAgLm1hdC1pY29uLnN0YXJ0IHtcclxuICAgIGZvbnQtc2l6ZTogNjBweDtcclxuICAgIHdpZHRoOiA3NXB4O1xyXG4gICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDQ4cHg7XHJcbiAgfVxyXG59XHJcbi5tYXQtaWNvbi1idXR0b24uc3RvcCB7XHJcbiAgd2lkdGg6IDc1cHg7XHJcbiAgaGVpZ2h0OiA3NXB4O1xyXG4gIGxpbmUtaGVpZ2h0OiA0OHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XHJcbiAgLm1hdC1pY29uLnN0b3Age1xyXG4gICAgZm9udC1zaXplOiA2MHB4O1xyXG4gICAgd2lkdGg6IDc1cHg7XHJcbiAgICBoZWlnaHQ6IDUwcHg7XHJcbiAgICBsaW5lLWhlaWdodDogNDhweDtcclxuICAgIGNvbG9yOiBsaWdodGdyZXk7XHJcbiAgfVxyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ "6R5h":
/*!***************************************************************!*\
  !*** ./src/app/components/pic-slide/pic-slide.component.scss ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwaWMtc2xpZGUuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "7b89":
/*!***********************************************************!*\
  !*** ./src/app/components/business/business.component.ts ***!
  \***********************************************************/
/*! exports provided: BusinessComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BusinessComponent", function() { return BusinessComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_business_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./business.component.html */ "usw9");
/* harmony import */ var _business_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./business.component.scss */ "Mict");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_validate_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/validate.service */ "hFt3");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/auth.service */ "lGQG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! sweetalert2 */ "PSD3");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_7__);








let BusinessComponent = class BusinessComponent {
    constructor(validateService, authService, router) {
        this.validateService = validateService;
        this.authService = authService;
        this.router = router;
    }
    ngOnInit() {
    }
    onRegisterSubmit() {
        const businessuser = {
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password1,
            birth: this.birth,
            licenseNum: this.licenseNum
        };
        if (!this.validateService.validatebusiness(businessuser)) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire({
                title: "회원가입 실패! ",
                text: "모두 입력해 주세요",
                icon: "error",
                confirmButtonText: "확인",
            });
            return false;
        }
        if (this.password1 !== this.password2) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire({
                title: "회원가입 실패! ",
                text: '비밀 번호가 일치하지 않습니다',
                icon: "error",
                confirmButtonText: "확인",
            });
            return false;
        }
        if (!this.validateService.validateEmail(businessuser.email)) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire({
                title: "회원가입 실패! ",
                text: '이메일 주소가 올바르지 않습니다',
                icon: "error",
                confirmButtonText: "확인",
            });
            return false;
        }
        if (!this.validateService.licensecheck(businessuser.licenseNum)) {
            sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire({
                title: "회원가입 실패! ",
                text: '사업자 번호를 확인해주세요!',
                icon: "error",
                confirmButtonText: "확인",
            });
            this.router.navigate(['/business']);
            return false;
        }
        this.authService.businessUser(businessuser).subscribe(data => {
            if (data.success) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire({
                    title: "회원가입 성공! ",
                    icon: "success",
                    confirmButtonText: "확인",
                });
                this.router.navigate(['/businesslogin']);
            }
            else {
                sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire({
                    title: "회원가입 실패! ",
                    text: data.msg,
                    icon: "error",
                    confirmButtonText: "확인",
                });
                this.router.navigate(['/business']);
                return false;
            }
        });
    }
};
BusinessComponent.ctorParameters = () => [
    { type: _services_validate_service__WEBPACK_IMPORTED_MODULE_4__["ValidateService"] },
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_6__["Router"] }
];
BusinessComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-business',
        template: _raw_loader_business_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_business_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], BusinessComponent);



/***/ }),

/***/ "8Zne":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/customer-list/customer-list.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<br />\n<h1 class=\"text-center\">회원 목록</h1>\n<div>\n  <div class=\"text-right mt-6\">\n    <p class=\"text-success\">회원 수: {{ customersQuantity }}</p>\n  </div>\n  <table class=\"table\">\n    <thead class=\"thead-dark\">\n      <tr class=\"text-center\">\n        <th scope=\"col\">이름</th>\n        <th scope=\"col\">ID</th>\n        <th scope=\"col\">이메일</th>\n        <th scope=\"col\">생일</th>\n        <th scope=\"col\">회원 삭제</th>\n      </tr>\n    </thead>\n\n    <tbody>\n      <tr *ngFor=\"let customer of customers\">\n        <td class=\"text-center\" style=\"width: 20%\">\n          <h5>{{ customer.name }}</h5>\n        </td>\n        <td class=\"text-center\" style=\"width: 20%\">\n          <h5>{{ customer.username }}</h5>\n        </td>\n        <td class=\"text-center\" style=\"width: 20%\">\n          <h5>{{ customer.email }}</h5>\n        </td>\n        <!-- <td class=\"text-center\" style=\"width: 20%;\">\n              <h5>{{ customer.password }}</h5>\n            </td> -->\n        <td class=\"text-center\" style=\"width: 20%\">\n          <h5>{{ customer.birth }}</h5>\n        </td>\n\n        <td class=\"text-center\" style=\"width: 10%\">\n          <button (click)=\"deleteCustomer(customer._id)\" class=\"btn btn-danger\">\n            삭제\n          </button>\n        </td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n");

/***/ }),

/***/ "A2xt":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/businesslogin/businesslogin.component.html ***!
  \*************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<br />\n<h2 class=\"page-header\">Qyaho 사업자 로그인</h2>\n<br />\n<form (ngSubmit)=\"onLoginSubmit()\">\n  <div class=\"form-group\">\n    <label>ID</label>\n    <input\n      type=\"text\"\n      class=\"form-control\"\n      name=\"username\"\n      [(ngModel)]=\"username\"\n    />\n  </div>\n  <br />\n  <div class=\"form-group\">\n    <label>비밀번호</label>\n    <input\n      type=\"password\"\n      class=\"form-control\"\n      name=\"password\"\n      [(ngModel)]=\"password\"\n    />\n  </div>\n  <br />\n  <div class=\"form-group\">\n    <label>사업자 번호(번호만 입력하세요.)</label>\n    <input\n      type=\"text\"\n      class=\"form-control\"\n      name=\"licenseNum\"\n      [(ngModel)]=\"licenseNum\"\n    />\n  </div>\n  <input type=\"submit\" class=\"btn btn-dark\" value=\"로그인\" />\n</form>\n");

/***/ }),

/***/ "AQa0":
/*!*********************************************************************!*\
  !*** ./src/app/components/businesslogin/businesslogin.component.ts ***!
  \*********************************************************************/
/*! exports provided: BusinessloginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BusinessloginComponent", function() { return BusinessloginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_businesslogin_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./businesslogin.component.html */ "A2xt");
/* harmony import */ var _businesslogin_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./businesslogin.component.scss */ "f0En");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/auth.service */ "lGQG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! sweetalert2 */ "PSD3");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_6__);







let BusinessloginComponent = class BusinessloginComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    ngOnInit() { }
    onLoginSubmit() {
        const businesslogin = {
            username: this.username,
            password: this.password,
            licenseNum: this.licenseNum,
        };
        this.authService.authenticatebusiness(businesslogin).subscribe((data) => {
            if (data.success) {
                this.authService.storeUserData(data.token, data.userNoPW);
                sweetalert2__WEBPACK_IMPORTED_MODULE_6___default.a.fire({
                    title: '로그인 성공! ',
                    icon: 'success',
                    confirmButtonText: '확인',
                });
                this.router.navigate(['']);
            }
            else {
                sweetalert2__WEBPACK_IMPORTED_MODULE_6___default.a.fire({
                    title: '로그인 실패! ',
                    text: data.msg,
                    icon: 'error',
                    confirmButtonText: '확인',
                });
                this.router.navigate(['/businesslogin']);
            }
        });
    }
};
BusinessloginComponent.ctorParameters = () => [
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }
];
BusinessloginComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-businesslogin',
        template: _raw_loader_businesslogin_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_businesslogin_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], BusinessloginComponent);



/***/ }),

/***/ "AytR":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "BuFo":
/*!***************************************************!*\
  !*** ./src/app/components/home/home.component.ts ***!
  \***************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_home_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./home.component.html */ "tXZI");
/* harmony import */ var _home_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home.component.scss */ "zPH0");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! sweetalert2 */ "PSD3");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _services_customers_num_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/customers_num.service */ "Zfc8");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/auth.service */ "lGQG");








let HomeComponent = class HomeComponent {
    constructor(authService, router, customer1Service) {
        this.authService = authService;
        this.router = router;
        this.customer1Service = customer1Service;
        this.business = Object;
        this.customers = [];
        this.customersQuantity = 0;
    }
    ngOnInit() {
        this.authService.getProfile().subscribe((profile) => {
            this.business = profile.user;
        }, (err) => {
            console.log(err);
            return false;
        });
        setInterval(() => {
            this.customer1Service.getCustomerNums().subscribe((data) => {
                this.customers = data;
                this.customersQuantity = data.length;
                console.log(this.customers);
            });
        }, 1000);
    }
    onLogoutClick() {
        this.authService.logout();
        sweetalert2__WEBPACK_IMPORTED_MODULE_5___default.a.fire({
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
};
HomeComponent.ctorParameters = () => [
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_7__["AuthService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _services_customers_num_service__WEBPACK_IMPORTED_MODULE_6__["CustomerNumService"] }
];
HomeComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-home',
        template: _raw_loader_home_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_home_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], HomeComponent);



/***/ }),

/***/ "I+a1":
/*!*************************************************************!*\
  !*** ./src/app/components/pic-slide/pic-slide.component.ts ***!
  \*************************************************************/
/*! exports provided: PicSlideComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PicSlideComponent", function() { return PicSlideComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_pic_slide_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./pic-slide.component.html */ "hv/c");
/* harmony import */ var _pic_slide_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pic-slide.component.scss */ "6R5h");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




let PicSlideComponent = class PicSlideComponent {
    constructor() {
        this.homeSlider = { items: 1, dots: true, navigator: true };
    }
};
PicSlideComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-pic-slide',
        template: _raw_loader_pic_slide_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_pic_slide_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PicSlideComponent);



/***/ }),

/***/ "LmEr":
/*!*******************************************************!*\
  !*** ./src/app/components/footer/footer.component.ts ***!
  \*******************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_footer_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./footer.component.html */ "WwN9");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



let FooterComponent = class FooterComponent {
    constructor() { }
    ngOnInit() {
    }
};
FooterComponent.ctorParameters = () => [];
FooterComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-footer',
        template: _raw_loader_footer_component_html__WEBPACK_IMPORTED_MODULE_1__["default"]
    })
], FooterComponent);



/***/ }),

/***/ "Ls9r":
/*!*********************************************************!*\
  !*** ./src/app/components/navbar/navbar.component.scss ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuYXZiYXIuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "Mict":
/*!*************************************************************!*\
  !*** ./src/app/components/business/business.component.scss ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJidXNpbmVzcy5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "MonW":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/qrscan1/qrscan1.component.html ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<br />\n<button\n  *ngIf=\"!isActive()\"\n  mat-icon-button class=\"start\"\n  (click)=\"toggleVideoMedia()\"\n  [disabled]=\"isActive()\"\n  color=\"primary\"\n  aria-label=\"videocam icon-button\"\n>\n  <mat-icon class=\"start\">qr_code_scanner</mat-icon>\n</button>\n\n<button\n  *ngIf=\"isActive()\"\n  mat-icon-button class=\"stop\"\n  (click)=\"toggleVideoMedia()\"\n  [disabled]=\"!isActive()\"\n  color=\"warn\"\n  aria-label=\"videocam icon-button\"\n>\n  <mat-icon class=\"stop\">qr_code_scanner</mat-icon>\n</button>\n<br />\n<video #video autoplay muted playsinline width=\"640\" height=\"480\"></video>\n<canvas #canvas hidden></canvas>\n");

/***/ }),

/***/ "NRKP":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/Qrscan/qrscan.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<br />\n<button\n  *ngIf=\"!isActive()\"\n  mat-icon-button\n  class=\"start\"\n  (click)=\"toggleVideoMedia()\"\n  [disabled]=\"isActive()\"\n  color=\"primary\"\n  aria-label=\"videocam icon-button\"\n>\n  <mat-icon class=\"start\">qr_code_scanner</mat-icon>\n</button>\n\n<button\n  *ngIf=\"isActive()\"\n  mat-icon-button\n  class=\"stop\"\n  (click)=\"toggleVideoMedia()\"\n  [disabled]=\"!isActive()\"\n  color=\"warn\"\n  aria-label=\"videocam icon-button\"\n>\n  <mat-icon class=\"stop\">qr_code_scanner</mat-icon>\n</button>\n<br />\n<video #video autoplay muted playsinline width=\"640\" height=\"480\"></video>\n<canvas #canvas hidden></canvas>\n");

/***/ }),

/***/ "NtNI":
/*!***********************************************************************!*\
  !*** ./src/app/components/customer-list/customer-list.component.scss ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjdXN0b21lci1saXN0LmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "S6iF":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/navbar/navbar.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<nav class=\"navbar navbar-expand-lg navbar-dark bg-dark\">\n  <a class=\"navbar-brand\" href=\"/\">Qyaho은행 사업자전용</a>\n  <button\n    class=\"navbar-toggler\"\n    type=\"button\"\n    data-toggle=\"collapse\"\n    data-target=\"#navbarSupportedContent\"\n    aria-controls=\"navbarSupportedContent\"\n    aria-expanded=\"false\"\n    aria-label=\"Toggle navigation\"\n  >\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n\n  <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n    <ul class=\"navbar-nav ml-auto\">\n      <li *ngIf=\"!checkLoggedIn()\" class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/business\">사업자 회원가입</a>\n      </li>\n\n      <li *ngIf=\"!checkLoggedIn()\" class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/businesslogin\">사업자 로그인</a>\n      </li>\n\n      <li *ngIf=\"checkLoggedIn()\" class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/Customer_list\">회원 목록 관리</a>\n      </li>\n\n      <li *ngIf=\"checkLoggedIn()\" class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/Customer_Num\">대기 순번 관리</a>\n      </li>\n\n      <li *ngIf=\"checkLoggedIn()\" class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/qrscan\">대기 순번 등록</a>\n      </li>\n\n      <li *ngIf=\"checkLoggedIn()\" class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/qrscan1\">대기 서비스 제공</a>\n      </li>\n\n      <li *ngIf=\"checkLoggedIn()\" class=\"nav-item\">\n        <a class=\"nav-link\" (click)=\"onLogoutClick()\" href=\"#\">로그아웃</a>\n      </li>\n    </ul>\n  </div>\n</nav>\n");

/***/ }),

/***/ "Sy1n":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./app.component.html */ "VzVu");
/* harmony import */ var _app_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component.scss */ "ynWL");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




let AppComponent = class AppComponent {
    constructor() {
        this.title = 'qyaho';
        this.name = 'Angular';
        this.imageObject = [{
                image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
                thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
                title: 'Hummingbirds are amazing creatures'
            }, {
                image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg',
                thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/9.jpg'
            }, {
                image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
                thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/4.jpg',
                title: 'Example with title.'
            }, {
                image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
                thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/7.jpg',
                title: 'Hummingbirds are amazing creatures'
            }, {
                image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg',
                thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/1.jpg'
            }, {
                image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
                thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/2.jpg',
                title: 'Example two with title.'
            }];
    }
};
AppComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-root',
        template: _raw_loader_app_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_app_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], AppComponent);



/***/ }),

/***/ "Tqkw":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/customer-num/customer-num.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<br>\n<h1 class=\"text-center\">대기 순번 </h1>\n<div>\n  <div class=\"text-right mt-6\">\n    <p class=\"text-success\">대기자: {{ customersQuantity }}</p>\n  </div>\n  <table class=\"table\">\n    <thead class=\"thead-dark\">\n      <tr class=\"text-center\">\n        <th scope=\"col\">순번</th>\n        <th scope=\"col\">이름</th>\n        <!-- <th scope=\"col\">Email</th> -->\n        <!-- <th scope=\"col\">ID</th> -->\n        <th scope=\"col\">대기 등록 시간</th>\n        <th scope=\"col\">순번 삭제</th>\n      </tr>\n    </thead>\n\n    <tbody>\n      <tr *ngFor=\"let customer of customers;\">\n        <td class=\"text-center\" style=\"width: 10%;\">\n          <h5>{{ customer.no }}</h5>\n        </td>\n        <td class=\"text-center\" style=\"width: 40%;\">\n          <h5>{{ customer.name }}</h5>\n        </td>\n        <!-- <td class=\"text-center\" style=\"width: 20%;\">\n            <h5>{{ customer.email }}</h5>\n          </td> -->\n        <!-- <td class=\"text-center\" style=\"width: 20%;\">\n          <h5>{{ customer.username }}</h5>\n        </td> -->\n        <!-- <td class=\"text-center\" style=\"width: 20%;\">\n          <h5>{{ customer.password }}</h5>\n        </td> -->\n        <td class=\"text-center\" style=\"width: 40%;\">\n            <h5>{{customer.time| date: 'MM/dd hh:mm:ss a'}}</h5>\n          </td>\n\n        <td class=\"text-center\" style=\"width: 10%;\">\n          <button (click)=\"deleteCustomer(customer._id)\" class=\"btn btn-danger\">삭제</button>\n        </td>\n        <!-- <td class=\"text-center\" style=\"width: 5%;\">\n          <button (click)=\"editEmployee(employee)\" class=\"btn btn-warning\">Edit</button>\n        </td> -->\n      </tr>\n    </tbody>\n  </table>\n</div>\n\n\n");

/***/ }),

/***/ "UrgT":
/*!***********************************************!*\
  !*** ./src/app/services/customers.service.ts ***!
  \***********************************************/
/*! exports provided: CustomersService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomersService", function() { return CustomersService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");



const httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
        'Content-Type': 'application/json',
    }),
};
//회원 목록
let CustomersService = class CustomersService {
    constructor(http) {
        this.http = http;
        this.API_URL = this.prepEndpoint('users/cus_list/');
    }
    prepEndpoint(ep) {
        // 1. localhost에 포팅시
        // return 'http://localhost:3000/' + ep;
        // 2. Heroku 클라우드 서버에 포팅시
        return ep;
    }
    getCustomers() {
        return this.http.get(this.API_URL, httpOptions);
    }
    deleteCustomer(id) {
        return this.http
            .delete(this.API_URL + `${id}`, httpOptions)
            .subscribe();
    }
};
CustomersService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
CustomersService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root',
    })
], CustomersService);



/***/ }),

/***/ "VzVu":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<html>\n  <header>\n    <app-navbar></app-navbar>\n  </header>\n  <body>\n    <div class=\"container\">\n      <router-outlet></router-outlet>\n    </div>\n  </body>\n  <footer>\n    <app-footer></app-footer>\n  </footer>\n</html>\n");

/***/ }),

/***/ "WwN9":
/*!***********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/footer/footer.component.html ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<footer class=\"py-10 bg-dark\">\n    <div class=\"container \" style= \"text-align: center;\" >\n        <p class=\"m-0 footer-text text-white \">Copyright &copy;2000 Qyaho</p>\n        <p class=\"m-0 footer-text text-white\"> Gradudation project</p>\n    </div>\n</footer>");

/***/ }),

/***/ "Xihf":
/*!********************************************************!*\
  !*** ./src/app/components/Qrscan/qrscan.component.css ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".mat-icon-button.start {\r\n  width: 75px;\r\n  height: 75px;\r\n  line-height: 48px;\r\n  background-color: lightgrey;\r\n}\r\n.mat-icon.start {\r\n  font-size: 60px;\r\n  width: 75px;\r\n  height: 50px;\r\n  line-height: 48px;\r\n}\r\n.mat-icon-button.stop {\r\n  width: 75px;\r\n  height: 75px;\r\n  line-height: 48px;\r\n  background-color: grey;\r\n}\r\n.mat-icon.stop {\r\n  font-size: 60px;\r\n  width: 75px;\r\n  height: 50px;\r\n  line-height: 48px;\r\n  color: lightgrey;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInFyc2Nhbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixpQkFBaUI7RUFDakIsMkJBQTJCO0FBQzdCO0FBQ0E7RUFDRSxlQUFlO0VBQ2YsV0FBVztFQUNYLFlBQVk7RUFDWixpQkFBaUI7QUFDbkI7QUFDQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLHNCQUFzQjtBQUN4QjtBQUNBO0VBQ0UsZUFBZTtFQUNmLFdBQVc7RUFDWCxZQUFZO0VBQ1osaUJBQWlCO0VBQ2pCLGdCQUFnQjtBQUNsQiIsImZpbGUiOiJxcnNjYW4uY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXQtaWNvbi1idXR0b24uc3RhcnQge1xyXG4gIHdpZHRoOiA3NXB4O1xyXG4gIGhlaWdodDogNzVweDtcclxuICBsaW5lLWhlaWdodDogNDhweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiBsaWdodGdyZXk7XHJcbn1cclxuLm1hdC1pY29uLnN0YXJ0IHtcclxuICBmb250LXNpemU6IDYwcHg7XHJcbiAgd2lkdGg6IDc1cHg7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIGxpbmUtaGVpZ2h0OiA0OHB4O1xyXG59XHJcbi5tYXQtaWNvbi1idXR0b24uc3RvcCB7XHJcbiAgd2lkdGg6IDc1cHg7XHJcbiAgaGVpZ2h0OiA3NXB4O1xyXG4gIGxpbmUtaGVpZ2h0OiA0OHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XHJcbn1cclxuLm1hdC1pY29uLnN0b3Age1xyXG4gIGZvbnQtc2l6ZTogNjBweDtcclxuICB3aWR0aDogNzVweDtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbiAgbGluZS1oZWlnaHQ6IDQ4cHg7XHJcbiAgY29sb3I6IGxpZ2h0Z3JleTtcclxufVxyXG4iXX0= */");

/***/ }),

/***/ "Z5Py":
/*!*******************************************************************!*\
  !*** ./src/app/components/customer-num/customer-num.component.ts ***!
  \*******************************************************************/
/*! exports provided: CustomerNumComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerNumComponent", function() { return CustomerNumComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_customer_num_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./customer-num.component.html */ "Tqkw");
/* harmony import */ var _customer_num_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customer-num.component.scss */ "r3tT");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_customers_num_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/customers_num.service */ "Zfc8");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! sweetalert2 */ "PSD3");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_5__);






let CustomerNumComponent = class CustomerNumComponent {
    constructor(customer1Service) {
        this.customer1Service = customer1Service;
        this.customers = [];
        this.customersQuantity = 0;
        this.customer1Service.getCustomerNums().subscribe((data) => {
            this.customers = data;
            this.customersQuantity = data.length;
        });
    }
    deleteCustomer(id) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_5___default.a.fire({
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
                this.customers = this.customers.filter((customer) => customer._id !== id);
                this.customersQuantity = this.customersQuantity - 1;
                sweetalert2__WEBPACK_IMPORTED_MODULE_5___default.a.fire('성공!', '예약이 취소 되었습니다.');
            }
        });
    }
};
CustomerNumComponent.ctorParameters = () => [
    { type: _services_customers_num_service__WEBPACK_IMPORTED_MODULE_4__["CustomerNumService"] }
];
CustomerNumComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-customer-num',
        template: _raw_loader_customer_num_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_customer_num_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], CustomerNumComponent);



/***/ }),

/***/ "ZAI4":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app-routing.module */ "vY5A");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _techiediaries_ngx_qrcode__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @techiediaries/ngx-qrcode */ "hiuq");
/* harmony import */ var ngx_bootstrap_tooltip__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-bootstrap/tooltip */ "Mfq2");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @auth0/angular-jwt */ "Nm8O");
/* harmony import */ var ngx_mask__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-mask */ "tmjD");
/* harmony import */ var ngx_owl_carousel__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-owl-carousel */ "uxF4");
/* harmony import */ var ngx_owl_carousel__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(ngx_owl_carousel__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./app.component */ "Sy1n");
/* harmony import */ var _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/navbar/navbar.component */ "hrlM");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/home/home.component */ "BuFo");
/* harmony import */ var _components_customer_list_customer_list_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/customer-list/customer-list.component */ "f86t");
/* harmony import */ var _components_customer_num_customer_num_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/customer-num/customer-num.component */ "Z5Py");
/* harmony import */ var _components_business_business_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/business/business.component */ "7b89");
/* harmony import */ var _components_businesslogin_businesslogin_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/businesslogin/businesslogin.component */ "AQa0");
/* harmony import */ var _components_Qrscan_qrscan_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/Qrscan/qrscan.component */ "1MMG");
/* harmony import */ var _components_pic_slide_pic_slide_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/pic-slide/pic-slide.component */ "I+a1");
/* harmony import */ var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/footer/footer.component */ "LmEr");
/* harmony import */ var _components_qrscan1_qrscan1_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/qrscan1/qrscan1.component */ "p//8");
/* harmony import */ var _services_validate_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./services/validate.service */ "hFt3");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./services/auth.service */ "lGQG");




























const maskConfig = {
    validation: false,
};
let AppModule = class AppModule {
};
AppModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_15__["AppComponent"],
            _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_16__["NavbarComponent"],
            _components_home_home_component__WEBPACK_IMPORTED_MODULE_17__["HomeComponent"],
            _components_customer_list_customer_list_component__WEBPACK_IMPORTED_MODULE_18__["CustomerListComponent"],
            _components_customer_num_customer_num_component__WEBPACK_IMPORTED_MODULE_19__["CustomerNumComponent"],
            _components_business_business_component__WEBPACK_IMPORTED_MODULE_20__["BusinessComponent"],
            _components_businesslogin_businesslogin_component__WEBPACK_IMPORTED_MODULE_21__["BusinessloginComponent"],
            _components_Qrscan_qrscan_component__WEBPACK_IMPORTED_MODULE_22__["QrscanComponent"],
            _components_pic_slide_pic_slide_component__WEBPACK_IMPORTED_MODULE_23__["PicSlideComponent"],
            _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_24__["FooterComponent"],
            _components_qrscan1_qrscan1_component__WEBPACK_IMPORTED_MODULE_25__["Qrscan1Component"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_5__["AppRoutingModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
            _techiediaries_ngx_qrcode__WEBPACK_IMPORTED_MODULE_10__["NgxQRCodeModule"],
            ngx_bootstrap_tooltip__WEBPACK_IMPORTED_MODULE_11__["TooltipModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MatIconModule"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_7__["MatDialogModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_9__["BrowserAnimationsModule"],
            ngx_owl_carousel__WEBPACK_IMPORTED_MODULE_14__["OwlModule"],
            _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_12__["JwtModule"].forRoot({
                config: {
                    tokenGetter: () => {
                        return localStorage.getItem('id_token');
                    },
                },
            }),
            ngx_mask__WEBPACK_IMPORTED_MODULE_13__["NgxMaskModule"].forRoot(maskConfig),
        ],
        providers: [_services_validate_service__WEBPACK_IMPORTED_MODULE_26__["ValidateService"], _services_auth_service__WEBPACK_IMPORTED_MODULE_27__["AuthService"]],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_15__["AppComponent"]],
    })
], AppModule);



/***/ }),

/***/ "Zfc8":
/*!***************************************************!*\
  !*** ./src/app/services/customers_num.service.ts ***!
  \***************************************************/
/*! exports provided: CustomerNumService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerNumService", function() { return CustomerNumService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");



const httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
        'Content-Type': 'application/json',
    }),
};
//대기 순번
let CustomerNumService = class CustomerNumService {
    constructor(http) {
        this.http = http;
    }
    prepEndpoint(ep) {
        // 1. localhost에 포팅시
        // return 'http://localhost:3000/' + ep;
        // 2. Heroku 클라우드 서버에 포팅시
        return ep;
    }
    getCustomerNums() {
        const getCustomer = this.prepEndpoint('cusnum/cus_nums');
        return this.http.get(getCustomer, httpOptions);
    }
    addCustomerNum(Cus_num) {
        const addCustomer = this.prepEndpoint('cusnum/cus_nums');
        return this.http.post(addCustomer, Cus_num, httpOptions);
    }
    addCustomer1Num(Cus_num) {
        const addCustomer1 = this.prepEndpoint('cusnum/cus_nums1');
        return this.http.post(addCustomer1, Cus_num, httpOptions);
    }
    deleteCustomerNum(id) {
        const deleteCustomer = this.prepEndpoint('cusnum/cus_nums');
        return this.http
            .delete(deleteCustomer + `${id}`, httpOptions)
            .subscribe();
    }
};
CustomerNumService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
CustomerNumService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root',
    })
], CustomerNumService);



/***/ }),

/***/ "f0En":
/*!***********************************************************************!*\
  !*** ./src/app/components/businesslogin/businesslogin.component.scss ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJidXNpbmVzc2xvZ2luLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "f86t":
/*!*********************************************************************!*\
  !*** ./src/app/components/customer-list/customer-list.component.ts ***!
  \*********************************************************************/
/*! exports provided: CustomerListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerListComponent", function() { return CustomerListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_customer_list_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./customer-list.component.html */ "8Zne");
/* harmony import */ var _customer_list_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customer-list.component.scss */ "NtNI");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_customers_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/customers.service */ "UrgT");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! sweetalert2 */ "PSD3");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_5__);






let CustomerListComponent = class CustomerListComponent {
    constructor(customersService) {
        this.customersService = customersService;
        this.customers = [];
        this.customersQuantity = 0;
    }
    ngOnInit() {
        this.customersService.getCustomers().subscribe((data) => {
            this.customers = data;
            this.customersQuantity = data.length;
        });
    }
    //회원 삭제
    deleteCustomer(id) {
        sweetalert2__WEBPACK_IMPORTED_MODULE_5___default.a.fire({
            title: '회원 삭제',
            text: '정말로 회원을 삭제 하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: '확인',
            cancelButtonText: '취소',
        }).then((result) => {
            if (result.value) {
                this.customersService.deleteCustomer(id);
                this.customers = this.customers.filter((customer) => customer._id !== id);
                this.customersQuantity = this.customersQuantity - 1;
                sweetalert2__WEBPACK_IMPORTED_MODULE_5___default.a.fire('성공!', '회원을 정상적으로 삭제했습니다.', 'success');
            }
        });
    }
};
CustomerListComponent.ctorParameters = () => [
    { type: _services_customers_service__WEBPACK_IMPORTED_MODULE_4__["CustomersService"] }
];
CustomerListComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-customer-list',
        template: _raw_loader_customer_list_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_customer_list_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], CustomerListComponent);



/***/ }),

/***/ "hFt3":
/*!**********************************************!*\
  !*** ./src/app/services/validate.service.ts ***!
  \**********************************************/
/*! exports provided: ValidateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidateService", function() { return ValidateService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


let ValidateService = class ValidateService {
    constructor() { }
    validateRegister(user) {
        if (user.name == "" || user.name == undefined || user.email == undefined || user.username == undefined || user.password == undefined || user.birth == undefined) {
            return false;
        }
        else {
            return true;
        }
    }
    validatebusiness(businessuser) {
        if (businessuser.name == "" || businessuser.name == undefined || businessuser.email == undefined || businessuser.username == undefined || businessuser.password == undefined) {
            return false;
        }
        else {
            return true;
        }
    }
    validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    licensecheck(licenseNum) {
        const stlicense = new String(licenseNum);
        const sl = stlicense.length;
        if (licenseNum <= 9999999999 && licenseNum >= 0 && sl == 10) {
            return true;
        }
        else {
            return false;
        }
    }
};
ValidateService.ctorParameters = () => [];
ValidateService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], ValidateService);



/***/ }),

/***/ "hrlM":
/*!*******************************************************!*\
  !*** ./src/app/components/navbar/navbar.component.ts ***!
  \*******************************************************/
/*! exports provided: NavbarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavbarComponent", function() { return NavbarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_navbar_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./navbar.component.html */ "S6iF");
/* harmony import */ var _navbar_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./navbar.component.scss */ "Ls9r");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/auth.service */ "lGQG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! sweetalert2 */ "PSD3");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_6__);







let NavbarComponent = class NavbarComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    ngOnInit() {
    }
    onLogoutClick() {
        this.authService.logout();
        sweetalert2__WEBPACK_IMPORTED_MODULE_6___default.a.fire({
            title: "로그아웃 성공! ",
            icon: "success",
            confirmButtonText: "확인",
        });
        this.router.navigate(['']);
        return false;
    }
    checkLoggedIn() {
        return this.authService.loggedIn();
    }
};
NavbarComponent.ctorParameters = () => [
    { type: _services_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }
];
NavbarComponent = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-navbar',
        template: _raw_loader_navbar_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_navbar_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], NavbarComponent);



/***/ }),

/***/ "hv/c":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/pic-slide/pic-slide.component.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"container\" style=\"text-align: center\">\n  <owl-carousel [options]=\"homeSlider\" [carouselClasses]=\"['owl-theme']\">\n    <div class=\"item\">\n      <img src=\"../../assets/images/img13.jpg\" />\n      <br />\n      <h1>Qyaho 은행</h1>\n    </div>\n    <div class=\"item\">\n      <img src=\"../../assets/images/img22.png\" /> \n      <br />\n      <h1>Qyaho 은행</h1>\n    </div>\n  </owl-carousel>\n</div>\n<br />\n");

/***/ }),

/***/ "lGQG":
/*!******************************************!*\
  !*** ./src/app/services/auth.service.ts ***!
  \******************************************/
/*! exports provided: AuthService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthService", function() { return AuthService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @auth0/angular-jwt */ "Nm8O");




const httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
        'Content-Type': 'application/json',
    }),
};
let AuthService = class AuthService {
    constructor(http, jwtHelper) {
        this.http = http;
        this.jwtHelper = jwtHelper;
    }
    prepEndpoint(ep) {
        // 1. localhost에 포팅시
        // return 'http://localhost:3000/' + ep;
        // 2. Heroku 클라우드 서버에 포팅시
        return ep;
    }
    loggedIn() {
        return !this.jwtHelper.isTokenExpired(this.authToken);
    }
    logout() {
        this.authToken = null;
        this.userNoPW = null;
        localStorage.clear();
    }
    businessUser(businessuser) {
        const BusinessUrl = this.prepEndpoint('businesses/cos');
        return this.http.post(BusinessUrl, businessuser, httpOptions);
    }
    authenticatebusiness(businesslogin) {
        const BloginUrl = this.prepEndpoint('businesses/authenticate');
        return this.http.post(BloginUrl, businesslogin, httpOptions);
    }
    storeUserData(token, userNoPW) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('business', JSON.stringify(userNoPW));
        this.authToken = token;
        this.userNoPW = userNoPW;
    }
    getProfile() {
        this.authToken = localStorage.getItem('id_token');
        const httpOptions1 = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.authToken,
            }),
        };
        const profileUrl = this.prepEndpoint('businesses/profile');
        return this.http.get(profileUrl, httpOptions1);
    }
};
AuthService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_3__["JwtHelperService"] }
];
AuthService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root',
    })
], AuthService);



/***/ }),

/***/ "p//8":
/*!*********************************************************!*\
  !*** ./src/app/components/qrscan1/qrscan1.component.ts ***!
  \*********************************************************/
/*! exports provided: Qrscan1Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Qrscan1Component", function() { return Qrscan1Component; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_qrscan1_component_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./qrscan1.component.html */ "MonW");
/* harmony import */ var _qrscan1_component_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./qrscan1.component.scss */ "2iP8");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var jsqr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! jsqr */ "7Ozu");
/* harmony import */ var jsqr__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jsqr__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _services_customers_num_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../services/customers_num.service */ "Zfc8");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! sweetalert2 */ "PSD3");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_7__);








let Qrscan1Component = class Qrscan1Component {
    constructor(customer1Service, dialog) {
        this.customer1Service = customer1Service;
        this.dialog = dialog;
    }
    toggleVideoMedia() {
        if (this.isActive()) {
            this.stopVideo();
            sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire({
                title: '카메라',
                text: '작동 중지',
                icon: 'success',
                confirmButtonText: '확인',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.reload();
                }
            });
        }
        else {
            this.startVideo();
            sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire({
                title: '카메라',
                text: '작동 시작',
                timer: 2000,
                icon: 'success',
                confirmButtonText: '확인',
            });
        } //swal
    }
    startVideo() {
        navigator.mediaDevices
            .enumerateDevices()
            .then((mediaDeviceInfoList) => {
            console.log(mediaDeviceInfoList);
            const videoDevices = mediaDeviceInfoList.filter((deviceInfo) => deviceInfo.kind === 'videoinput');
            if (videoDevices.length === 0) {
                throw new Error('no video input devices');
            }
            return navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    deviceId: videoDevices[0].deviceId,
                    autoGainControl: true,
                    width: 960,
                    height: 640,
                },
            });
        })
            .then((mediaStream) => {
            this.stream = mediaStream;
            if (this.videoElement) {
                this.videoElement.nativeElement.srcObject = mediaStream;
                this.processImage();
            }
        })
            .catch((error) => {
            console.error(error);
        });
    }
    stopVideo() {
        if (this.stream) {
            this.stream.getVideoTracks()[0].stop();
        }
    }
    isActive() {
        return this.stream !== undefined && this.stream.active;
    }
    processImage() {
        if (this.videoElement && this.canvasElement && this.isActive()) {
            const width = this.canvasElement.nativeElement.width;
            const height = this.canvasElement.nativeElement.height;
            const context = this.canvasElement.nativeElement.getContext('2d');
            context.drawImage(this.videoElement.nativeElement, 0, 0, width, height);
            const imageData = context.getImageData(0, 0, width, height);
            //console.log(imageData);
            const qrcode = jsqr__WEBPACK_IMPORTED_MODULE_4___default()(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: 'dontInvert',
            });
            if (qrcode && qrcode.data.length !== 0) {
                this.manageSubmit(qrcode.data);
                setTimeout(() => {
                    this.processImage();
                }, 7000);
            }
            else {
                setTimeout(() => {
                    this.processImage();
                }, 3000);
            }
        }
    }
    manageSubmit(values) {
        this.customer1Service.addCustomer1Num(values).subscribe((data) => {
            if (data.success) {
                sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire({
                    title: data.title,
                    text: data.msg,
                    icon: 'success',
                    confirmButtonText: '확인',
                });
            }
            else {
                sweetalert2__WEBPACK_IMPORTED_MODULE_7___default.a.fire({
                    title: data.title,
                    text: data.msg,
                    icon: 'error',
                    confirmButtonText: '확인',
                });
            }
        });
    }
};
Qrscan1Component.ctorParameters = () => [
    { type: _services_customers_num_service__WEBPACK_IMPORTED_MODULE_6__["CustomerNumService"] },
    { type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_5__["MatDialog"] }
];
Qrscan1Component.propDecorators = {
    videoElement: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['video',] }],
    canvasElement: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewChild"], args: ['canvas',] }]
};
Qrscan1Component = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-qrscan1',
        template: _raw_loader_qrscan1_component_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_qrscan1_component_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], Qrscan1Component);



/***/ }),

/***/ "r3tT":
/*!*********************************************************************!*\
  !*** ./src/app/components/customer-num/customer-num.component.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjdXN0b21lci1udW0uY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "tXZI":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/home/home.component.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<style type=\"text/css\">\n  .blank {\n    height: 150px;\n  }\n</style>\n\n<br />\n<div *ngIf=\"!checkLoggedIn()\" style=\"text-align: center; vertical-align: top\">\n  <h4 class=\"comment\">아직 계정이 없으신가요?</h4>\n  <h3 class=\"comment1\">계정이 있으시면 로그인하세요!</h3>\n  <br />\n\n  <button\n    *ngIf=\"!checkLoggedIn()\"\n    type=\"button\"\n    class=\"btn btn-dark\"\n    routerLink=\"/business\"\n  >\n    사업자 회원 가입\n  </button>\n  &nbsp;\n  <button\n    *ngIf=\"!checkLoggedIn()\"\n    type=\"button\"\n    style=\"text-align: center; vertical-align: top\"\n    class=\"btn btn-dark\"\n    type=\"button\"\n    routerLink=\"/businesslogin\"\n  >\n    사업자 로그인\n  </button>\n  &nbsp;\n  <br />\n</div>\n<br />\n<div\n  *ngIf=\"checkLoggedIn()\"\n  style=\"\n    text-align: center;\n    vertical-align: top;\n    border: 1px solid lightgrey;\n    border-radius: 60px;\n    padding-top: 10px;\n    background-color: lightgrey;\n  \"\n>\n  <h1 style=\"padding-top: 10px; padding-bottom: 10px\">\n    어서오세요! Qyaho 은행입니다.\n  </h1>\n</div>\n<br />\n<div\n  *ngIf=\"checkLoggedIn()\"\n  style=\"\n    text-align: center;\n    vertical-align: top;\n    border: 1px solid lightgrey;\n    border-radius: 5px;\n    padding: 10px;\n    background-color: lightgrey;\n  \"\n>\n  <h2>현재 대기자 수는 {{ customersQuantity }}명 입니다.</h2>\n  <h2>예상 대기 시간은 {{ customersQuantity * 5 }}분 입니다.</h2>\n</div>\n<br />\n<div>\n  <app-pic-slide></app-pic-slide>\n</div>\n");

/***/ }),

/***/ "usw9":
/*!***************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/business/business.component.html ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<br>\n<h2 class=\"page-header\">Qyaho 사업자 회원가입</h2>\n<br>\n<form (ngSubmit)=\"onRegisterSubmit()\">\n    <div class = \"from-group\">\n        <label> * 이름 </label>\n        <input type=\"text\" [(ngModel)]=\"name\" name=\"name\" class=\"form-control\">\n    </div>\n    <div class=\"form-gruop\">\n        <label> * 이메일 </label>\n        <input type=\"text\" [(ngModel)]=\"email\" name=\"email\" class=\"form-control\">\n    </div>\n    <div class=\"form-gruop\">\n        <label> * 생년월일 </label>\n        <input type=\"date\" [(ngModel)]=\"birth\" name=\"birth\" class=\"form-control\">\n    </div>\n    <div class=\"form-gruop\">\n        <label> * ID </label>\n        <input type=\"text\" [(ngModel)]=\"username\" name=\"username\" class=\"form-control\">\n    </div>\n    <div class=\"form-group\">\n        <label> * 비밀번호 </label>\n        <input type=\"password\" [(ngModel)]=\"password1\" name=\"password1\" class=\"form-control\">\n    </div>\n    <div class=\"form-group\">\n        <label> * 비밀번호 확인 </label>\n        <input type=\"password\" [(ngModel)]=\"password2\" name=\"password2\" class=\"form-control\">\n    </div>\n    <div class = \"form-group\">\n        <label> * 사업자 번호('-' 없이 입력) </label>\n        <input type=\"number\" [(ngModel)]=\"licenseNum\" name=\"licenseNum\" class=\"form-control\">\n    </div>\n    <br>\n    <input type=\"submit\" class=\"btn btn-dark\" value=\"가입하기\">\n</form>");

/***/ }),

/***/ "vY5A":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/navbar/navbar.component */ "hrlM");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/home/home.component */ "BuFo");
/* harmony import */ var _components_customer_num_customer_num_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/customer-num/customer-num.component */ "Z5Py");
/* harmony import */ var _components_business_business_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/business/business.component */ "7b89");
/* harmony import */ var _components_businesslogin_businesslogin_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/businesslogin/businesslogin.component */ "AQa0");
/* harmony import */ var _components_customer_list_customer_list_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/customer-list/customer-list.component */ "f86t");
/* harmony import */ var _components_Qrscan_qrscan_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/Qrscan/qrscan.component */ "1MMG");
/* harmony import */ var _components_qrscan1_qrscan1_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/qrscan1/qrscan1.component */ "p//8");











const routes = [
    { path: '', component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"] },
    { path: 'navbar', component: _components_navbar_navbar_component__WEBPACK_IMPORTED_MODULE_3__["NavbarComponent"] },
    { path: 'Customer_Num', component: _components_customer_num_customer_num_component__WEBPACK_IMPORTED_MODULE_5__["CustomerNumComponent"] },
    { path: 'business', component: _components_business_business_component__WEBPACK_IMPORTED_MODULE_6__["BusinessComponent"] },
    { path: 'businesslogin', component: _components_businesslogin_businesslogin_component__WEBPACK_IMPORTED_MODULE_7__["BusinessloginComponent"] },
    { path: 'Customer_list', component: _components_customer_list_customer_list_component__WEBPACK_IMPORTED_MODULE_8__["CustomerListComponent"] },
    { path: 'qrscan', component: _components_Qrscan_qrscan_component__WEBPACK_IMPORTED_MODULE_9__["QrscanComponent"] },
    { path: 'qrscan1', component: _components_qrscan1_qrscan1_component__WEBPACK_IMPORTED_MODULE_10__["Qrscan1Component"] },
    { path: '**', component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_4__["HomeComponent"] },
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes, { useHash: true })],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], AppRoutingModule);



/***/ }),

/***/ "ynWL":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("html {\n  height: 100%;\n}\n\nbody {\n  margin: 0;\n  font-family: basic-sans, sans-serif;\n  line-height: 1.6;\n  display: flex;\n  flex-direction: column;\n  min-height: 100%;\n}\n\nfooter {\n  margin-top: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uXFwuLlxcYXBwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtBQUNGOztBQUVBO0VBQ0UsU0FBQTtFQUNBLG1DQUFBO0VBQ0EsZ0JBQUE7RUFFQSxhQUFBO0VBQ0Esc0JBQUE7RUFFQSxnQkFBQTtBQURGOztBQUlBO0VBQ0UsZ0JBQUE7QUFERiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJodG1sIHtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbmJvZHkge1xyXG4gIG1hcmdpbjogMDtcclxuICBmb250LWZhbWlseTogYmFzaWMtc2Fucywgc2Fucy1zZXJpZjtcclxuICBsaW5lLWhlaWdodDogMS42O1xyXG5cclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcblxyXG4gIG1pbi1oZWlnaHQ6IDEwMCU7XHJcbn1cclxuXHJcbmZvb3RlciB7XHJcbiAgbWFyZ2luLXRvcDogYXV0bztcclxufVxyXG4iXX0= */");

/***/ }),

/***/ "zPH0":
/*!*****************************************************!*\
  !*** ./src/app/components/home/home.component.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJob21lLmNvbXBvbmVudC5zY3NzIn0= */");

/***/ }),

/***/ "zUnb":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "a3Wg");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "ZAI4");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "AytR");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map