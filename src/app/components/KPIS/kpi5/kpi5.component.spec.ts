import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kpi5Component } from './kpi5.component';

describe('Kpi5Component', () => {
  let component: Kpi5Component;
  let fixture: ComponentFixture<Kpi5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kpi5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kpi5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
