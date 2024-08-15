import { TestBed } from '@angular/core/testing';
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from "../../modules/material";
import { GanalyticsComponent } from "../ganalytics/ganalytics.component";
import { AppComponent } from './app.component';
import { InputsComponent, InputsModalComponent } from "../../modules/delivery/components";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        MaterialModule
      ],
      declarations: [
        AppComponent,
        InputsComponent,
        InputsModalComponent,
        GanalyticsComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Angular11'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).not.toBeNull();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.toolbar .toolbar__title').textContent).not.toBeNull();
  });
});
