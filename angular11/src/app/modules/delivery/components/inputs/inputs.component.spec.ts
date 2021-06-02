import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { MaterialModule } from "../../../material";

import { InputsComponent } from './inputs.component';

describe('InputsComponent', () => {
  let component: InputsComponent;
  let fixture: ComponentFixture<InputsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputsComponent ],
      imports: [ FormsModule, MaterialModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getResults() should update', () => {
    expect(component.getResults).toBeTruthy();
    expect(component.dservice).toBeTruthy();
    expect(component.dservice.results.history.length).toBe(0);
    component.getResults();
    expect(component.dservice.results.history.length).toBe(1);
  });
});
