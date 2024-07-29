import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaBaixaComponent } from './alta-baixa.component';

describe('AltaBaixaComponent', () => {
  let component: AltaBaixaComponent;
  let fixture: ComponentFixture<AltaBaixaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltaBaixaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaBaixaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
