import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageReportsComponent } from './page-reports.component';
import { ReportsComponent, ResultsComponent } from '../';

describe('PageReportsComponent', () => {
  let component: PageReportsComponent;
  let fixture: ComponentFixture<PageReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageReportsComponent, ReportsComponent, ResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
