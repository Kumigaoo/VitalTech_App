import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualitzarHabitacionesComponent } from './actualitzar-habitaciones.component';

describe('ActualitzarHabitacionesComponent', () => {
  let component: ActualitzarHabitacionesComponent;
  let fixture: ComponentFixture<ActualitzarHabitacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualitzarHabitacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualitzarHabitacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
