import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresComponent } from './ingres.component';

describe('IngresComponent', () => {
  let component: IngresComponent;
  let fixture: ComponentFixture<IngresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
