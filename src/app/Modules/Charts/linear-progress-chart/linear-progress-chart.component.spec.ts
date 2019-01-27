import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearProgressChartComponent } from './linear-progress-chart.component';

describe('LinearProgressChartComponent', () => {
  let component: LinearProgressChartComponent;
  let fixture: ComponentFixture<LinearProgressChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinearProgressChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinearProgressChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
