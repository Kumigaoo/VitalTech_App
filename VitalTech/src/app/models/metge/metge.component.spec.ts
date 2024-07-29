import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetgeComponent } from './metge.component';

describe('MetgeComponent', () => {
  let component: MetgeComponent;
  let fixture: ComponentFixture<MetgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
