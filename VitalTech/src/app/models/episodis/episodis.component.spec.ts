import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodisComponent } from './episodis.component';

describe('EpisodisComponent', () => {
  let component: EpisodisComponent;
  let fixture: ComponentFixture<EpisodisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EpisodisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EpisodisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
