import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../material';

import { PageHistoryComponent } from './page-history.component';
import { HistoryComponent, ResultsComponent } from '../';

describe('PageHistoryComponent', () => {
  let component: PageHistoryComponent;
  let fixture: ComponentFixture<PageHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageHistoryComponent, HistoryComponent, ResultsComponent ],
      imports: [ MaterialModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
