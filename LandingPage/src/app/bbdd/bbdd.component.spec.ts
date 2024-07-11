import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BbddComponent } from './bbdd.component';

describe('BbddComponent', () => {
  let component: BbddComponent;
  let fixture: ComponentFixture<BbddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BbddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BbddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
