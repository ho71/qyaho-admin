import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Qrscan1Component } from './qrscan1.component';

describe('Qrscan1Component', () => {
  let component: Qrscan1Component;
  let fixture: ComponentFixture<Qrscan1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Qrscan1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Qrscan1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
