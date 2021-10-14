import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicSlideComponent } from './pic-slide.component';

describe('PicSlideComponent', () => {
  let component: PicSlideComponent;
  let fixture: ComponentFixture<PicSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicSlideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PicSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
