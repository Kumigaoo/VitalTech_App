import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlitsPopupComponent } from './llits-popup.component';

describe('LlitsPopupComponent', () => {
  let component: LlitsPopupComponent;
  let fixture: ComponentFixture<LlitsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlitsPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LlitsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
