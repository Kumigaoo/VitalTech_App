import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifConsultaComponent } from './modif-consulta.component';

describe('ModifConsultaComponent', () => {
  let component: ModifConsultaComponent;
  let fixture: ComponentFixture<ModifConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
