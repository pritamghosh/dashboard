import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionFlightreportComponent } from './accordion-flightreport.component';

describe('AccordionFlightreportComponentComponent', () => {
  let component: AccordionFlightreportComponent;
  let fixture: ComponentFixture<AccordionFlightreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordionFlightreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionFlightreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
