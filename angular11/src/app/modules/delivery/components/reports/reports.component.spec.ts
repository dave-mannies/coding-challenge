import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from "../../../material";
import { ResultsHistoryComponent } from "../results-history/results-history.component";
import { ResultsComponent } from "../results/results.component";

import { ReportsComponent } from './reports.component';

describe('ReportsComponent', () => {
  let component: ReportsComponent;
  let fixture: ComponentFixture<ReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsComponent, ResultsComponent, ResultsHistoryComponent ],
      imports: [ MaterialModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
