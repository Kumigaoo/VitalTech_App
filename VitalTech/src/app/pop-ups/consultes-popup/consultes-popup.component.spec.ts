import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultesPopupComponent } from './consultes-popup.component';

describe('ConsultesPopupComponent', () => {
  let component: ConsultesPopupComponent;
  let fixture: ComponentFixture<ConsultesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultesPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
