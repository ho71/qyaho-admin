import { Component, ElementRef, ViewChild } from '@angular/core';
import jsQR from 'jsqr';
import { CustomerNumService } from '../../services/customers_num.service';
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
  no: number = 1;

  constructor(
    private customer1Service: CustomerNumService
  ) {}

  toggleVideoMedia(): void {
    if (this.isActive()) {
      this.stopVideo();
      Swal.fire({
        title: '카메라',
        text: '작동 중지',
        icon: 'success',
        confirmButtonText: '확인',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    } else {
      this.startVideo();
      Swal.fire({
        title: '카메라',
        text: '작동 시작',
        timer: 2000,
        icon: 'success',
        confirmButtonText: '확인',
      });
    } //swal
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
        const par = JSON.parse(qrcode.data);
        par.no = this.no;
        console.log(this.no);
        qrcode.data = JSON.stringify(par);
        this.manageSubmit(qrcode.data);
        setTimeout(() => {
          this.processImage();
        }, 7000);
      } else {
        setTimeout(() => {
          this.processImage();
        }, 3000);
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
        this.no += 1;
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
}
