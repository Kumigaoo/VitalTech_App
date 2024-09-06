import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifLlitComponent } from './modif-llit.component';

describe('ModifLlitComponent', () => {
  let component: ModifLlitComponent;
  let fixture: ComponentFixture<ModifLlitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifLlitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifLlitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
