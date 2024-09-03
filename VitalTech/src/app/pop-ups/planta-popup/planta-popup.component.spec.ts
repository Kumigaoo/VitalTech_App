import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantaPopupComponent } from './planta-popup.component';

describe('PlantaPopupComponent', () => {
  let component: PlantaPopupComponent;
  let fixture: ComponentFixture<PlantaPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantaPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantaPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
