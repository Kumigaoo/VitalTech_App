import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodisMedicsPopupComponent } from './episodis-medics-popup.component';

describe('EpisodisMedicsPopupComponent', () => {
  let component: EpisodisMedicsPopupComponent;
  let fixture: ComponentFixture<EpisodisMedicsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodisMedicsPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodisMedicsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
