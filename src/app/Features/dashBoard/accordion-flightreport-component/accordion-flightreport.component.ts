import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { FlightsDelayedDataService } from '../../../services/flights-delayed-data.service';

@Component({
  selector: 'app-accordion-flightreport',
  templateUrl: './accordion-flightreport.component.html',
  styleUrls: ['./accordion-flightreport.component.scss']
})
export class AccordionFlightreportComponent implements OnInit {

  topAirportsDet: any = [];
  topAirlinesDet: any = [];
  // public status: any = {
  //      isOpen: true
  // };

  constructor(private flightDelayedDataService : FlightsDelayedDataService) {
  }
  ngOnInit() {
    this.flightDelayedDataService.getTopAirports().subscribe(topAirportsDet => {
      const result = topAirportsDet._body;
      if (result) {
        this.topAirportsDet = JSON.parse(result);
      }
      //console.log(topAirportsDet);
      //this.topAirportsDet = topAirportsDet
      //error => { console.error('Error in getTotalFlights: ' + error)}
        },
        error => { console.error('Error in getTotalFlights: ' + error)}
    );

    this.flightDelayedDataService.getTopAirlines().subscribe(topAirlinesDet => {
      const result = topAirlinesDet._body;
      if (result) {
        this.topAirlinesDet = JSON.parse(result);
      }
    },
    error => { console.error('Error in getTotalFlights: ' + error)}
    );
  }

  isOpen(i){
    if(i == 0){
      i++;
      return true;
    }
  }
}
