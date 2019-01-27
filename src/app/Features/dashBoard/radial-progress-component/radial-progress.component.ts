import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { FlightsDelayedDataService } from '../../../services/flights-delayed-data.service';
import { PassengerDataService } from '../../../services/passenger-data.service';


@Component({
  selector: 'app-radial-progress',
  templateUrl: './radial-progress.component.html',
  styleUrls: ['./radial-progress.component.scss']
})
export class RadialProgressComponent implements OnInit {

  flightsDelayed: any;
  totalFlights: any;
  flightsOverBooked: any;
  totalAcceptedPax: any;
  totalPax: any;

  flightChartColor: string;
  flightOverbookedChartColor: string;
  paxChartColor: string;

  isFlightsDealyedDataRetrieved: boolean = false;
  isTotalFlightsDataRetrieved: boolean = false;
  isFlightsOverbookedDataRetrived: boolean = false;
  isTotalPaxRetrived: boolean = false;
  isAcceptedPaxRetrived: boolean = false;

  constructor(private flightsDataService: FlightsDelayedDataService, private passengerDataService: PassengerDataService) {
    this.flightChartColor = '#FF0000';
    this.paxChartColor = '#4169E1';
    this.flightOverbookedChartColor = '#40E0D0';
  }
  ngOnInit() {
    this.flightsDataService.getTotalFlights().subscribe(
      totalFlights => {
        const result = totalFlights._body;
        if (result) {
          this.totalFlights = JSON.parse(result);
          this.isTotalFlightsDataRetrieved = true;
        }
      },
      error => { console.error('Error in getTotalFlights: ' + error) }
    );

    this.flightsDataService.getDelayedFlightsData().subscribe(
      delayedFlights => {
        const result = delayedFlights._body;
        if (result) {
          this.flightsDelayed = JSON.parse(result);
         this.isFlightsDealyedDataRetrieved = true;
        }
      },
      error => { console.error('Error in getDelayedFlightsData: ' + error) }
    );

    this.flightsDataService.getOverBookedFlights().subscribe(
      overBookedFlights => {
        const result = overBookedFlights._body;
        if (result) {
          //let reslt = JSON.parse(result);
          this.flightsOverBooked =  JSON.parse(result);
          this.isFlightsOverbookedDataRetrived = true;
        }
      },
      error => { console.error('Error in getOverBookedFlights: ' + error) }
    );

    this.passengerDataService.getAcceptedPassengersCount().subscribe(
      totalAcceptedPassengers => {
        const result = totalAcceptedPassengers._body;
        if (result) {
          this.totalAcceptedPax = JSON.parse(result);
          this.isAcceptedPaxRetrived = true;
        }
      }
    );

    this.totalPax = [{ "totalPax": 10000000 }];
    this.isTotalPaxRetrived = true;
  }
}
