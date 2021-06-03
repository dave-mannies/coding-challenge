import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "../../../material";

import { PageReportsComponent } from './page-reports.component';
import { ReportsComponent, ResultsComponent, ResultsHistoryComponent } from '../';

describe('PageReportsComponent', () => {
  let component: PageReportsComponent;
  let fixture: ComponentFixture<PageReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageReportsComponent, ReportsComponent, ResultsComponent, ResultsHistoryComponent ],
      imports: [ MaterialModule, NoopAnimationsModule ]
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
