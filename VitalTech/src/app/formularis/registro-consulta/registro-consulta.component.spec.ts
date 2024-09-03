import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroConsultaComponent } from './registro-consulta.component';

describe('RegistroConsultaComponent', () => {
  let component: RegistroConsultaComponent;
  let fixture: ComponentFixture<RegistroConsultaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroConsultaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
