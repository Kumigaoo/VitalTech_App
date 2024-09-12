import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarHabitacionesComponent } from './agregar-habitaciones.component';

describe('AgregarHabitacionesComponent', () => {
  let component: AgregarHabitacionesComponent;
  let fixture: ComponentFixture<AgregarHabitacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarHabitacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarHabitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
