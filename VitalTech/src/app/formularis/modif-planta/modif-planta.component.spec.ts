import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifPlantaComponent } from './modif-planta.component';

describe('ModifPlantaComponent', () => {
  let component: ModifPlantaComponent;
  let fixture: ComponentFixture<ModifPlantaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifPlantaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifPlantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
