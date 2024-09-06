import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroLlitComponent } from './registro-llit.component';

describe('RegistroLlitComponent', () => {
  let component: RegistroLlitComponent;
  let fixture: ComponentFixture<RegistroLlitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroLlitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroLlitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
