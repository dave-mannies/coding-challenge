import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../material';
import { ResultsComponent } from '../results/results.component';

import { ResultsHistoryComponent } from './results-history.component';

describe('ResultsHistoryComponent', () => {
  let component: ResultsHistoryComponent;
  let fixture: ComponentFixture<ResultsHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsHistoryComponent, ResultsComponent ],
      imports: [ MaterialModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
