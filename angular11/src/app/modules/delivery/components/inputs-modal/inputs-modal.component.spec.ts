import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../../material';

import { InputsModalComponent } from './inputs-modal.component';

describe('InputsModalComponent', () => {
  let component: InputsModalComponent;
  let fixture: ComponentFixture<InputsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputsModalComponent ],
      imports: [ MaterialModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
