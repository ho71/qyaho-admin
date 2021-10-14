import { Component, ElementRef, ViewChild } from '@angular/core';
import jsQR, { QRCode } from 'jsqr';
import { DialogComponent } from '../dialog/dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { CustomerNumService } from '../../services/customers_num.service';
import { Cus_num } from '../../models/cus.num';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-qrscan',
  templateUrl: './qrscan.component.html',
  styleUrls: ['./qrscan.component.css'],
})
export class QrscanComponent {
  @ViewChild('video') videoElement: ElementRef | undefined;
  @ViewChild('canvas') canvasElement: ElementRef | undefined;

  stream: MediaStream | undefined;

  customers: Cus_num[] = [];
  customersQuantity: number = 0;

  constructor(
    private customer1Service: CustomerNumService,
    public dialog: MatDialog
  ) {}

  toggleVideoMedia(): void {
    if (this.isActive()) {
      this.stopVideo();
    } else {
      this.startVideo();
    }
  }

  startVideo(): void {
    navigator.mediaDevices
      .enumerateDevices()
      .then((mediaDeviceInfoList) => {
        console.log(mediaDeviceInfoList);
        const videoDevices = mediaDeviceInfoList.filter(
          (deviceInfo) => deviceInfo.kind === 'videoinput'
        );
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

  stopVideo(): void {
    if (this.stream) {
      this.stream.getVideoTracks()[0].stop();
    }
  }

  isActive(): boolean {
    return this.stream !== undefined && this.stream.active;
  }

  processImage(): void {
    if (this.videoElement && this.canvasElement && this.isActive()) {
      const width = this.canvasElement.nativeElement.width;

      const height = this.canvasElement.nativeElement.height;

      const context = this.canvasElement.nativeElement.getContext(
        '2d'
      ) as CanvasRenderingContext2D;

      context.drawImage(this.videoElement.nativeElement, 0, 0, width, height);

      const imageData = context.getImageData(0, 0, width, height);
      //console.log(imageData);

      const qrcode = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });

      if (qrcode && qrcode.data.length !== 0) {
        this.openDialog(qrcode);
      } else {
        setTimeout(() => {
          this.processImage();
        }, 100);
      }
    }
  }

  manageSubmit(values) {
    this.customer1Service.addCustomerNum(values).subscribe((data) => {
      if (data.success) {
        Swal.fire({
          title: data.title,
          text: data.msg,
          icon: 'success',
          confirmButtonText: '확인',
        });
        this.customers.push(values);
        this.customersQuantity = this.customersQuantity + 1;
      } else {
        Swal.fire({
          title: data.title,
          text: data.msg,
          icon: 'error',
          confirmButtonText: '확인',
        });
      }
    });
  }

  openDialog(qrcode: QRCode) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: { qrcode: qrcode },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (this.isActive()) {
        this.processImage();
        this.manageSubmit(qrcode.data);

        // this.qradd.addCustomerNum1().subscribe((data) => {
        //   return this.customers.push(data);
        // });
        // this.customersQuantity = this.customersQuantity + 1
      }
    });
  }
}
