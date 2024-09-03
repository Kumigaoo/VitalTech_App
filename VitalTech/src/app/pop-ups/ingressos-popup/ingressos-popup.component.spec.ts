import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngressosPopupComponent } from './ingressos-popup.component';

describe('IngressosPopupComponent', () => {
  let component: IngressosPopupComponent;
  let fixture: ComponentFixture<IngressosPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngressosPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngressosPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
