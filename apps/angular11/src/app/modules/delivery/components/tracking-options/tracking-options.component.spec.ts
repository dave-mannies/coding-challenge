import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingOptionsComponent } from './tracking-options.component';

describe('TrackingOptionsComponent', () => {
  let component: TrackingOptionsComponent;
  let fixture: ComponentFixture<TrackingOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
