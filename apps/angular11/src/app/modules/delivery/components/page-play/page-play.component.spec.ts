import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from "../../../material";

import { PagePlayComponent } from './page-play.component';
import { PlayComponent, ResultsComponent, ResultsHistoryComponent } from '../';

describe('PagePlayComponent', () => {
  let component: PagePlayComponent;
  let fixture: ComponentFixture<PagePlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagePlayComponent, PlayComponent, ResultsComponent, ResultsHistoryComponent ],
      imports: [ MaterialModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
