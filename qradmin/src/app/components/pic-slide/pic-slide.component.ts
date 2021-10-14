import { Component } from '@angular/core';

@Component({
  selector: 'app-pic-slide',
  templateUrl: './pic-slide.component.html',
  styleUrls: ['./pic-slide.component.scss'],
})
export class PicSlideComponent {
  homeSlider = { items: 1, dots: true, navigator: true };
}
