import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kpi2Component } from './kpi2.component';

describe('Kpi2Component', () => {
  let component: Kpi2Component;
  let fixture: ComponentFixture<Kpi2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kpi2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kpi2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
