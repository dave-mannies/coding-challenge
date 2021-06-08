import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingHtmlComponent } from './tracking-html.component';

describe('TrackingHtmlComponent', () => {
  let component: TrackingHtmlComponent;
  let fixture: ComponentFixture<TrackingHtmlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingHtmlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
