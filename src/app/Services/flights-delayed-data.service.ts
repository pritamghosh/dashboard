import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx'

@Injectable()
export class FlightsDelayedDataService {

  constructor(private http: Http) { }
  private headers = new Headers({ 'Content-Type': 'application/json' });

  getDelayedFlightsData() {
    return this.http.get('http://127.0.0.1:8081/flights/retriveDelayedFlightCount')
    .map(response => response)
    .catch(this.handleError);
  }

  getTotalFlights() {
    return this.http.get('http://127.0.0.1:8081/flights/retriveTotalFlightCount')
    .map(response => response)
    .catch(this.handleError);
  }
  
  getOverBookedFlights() {
    return this.http.get('http://127.0.0.1:8081/flights/retriveFlightOverBookedCount')
    .map(response => response)
    .catch(this.handleError);
  }

  public handleError(error: Response) {
    console.log('error');
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }
  
  getTopAirports() {
    return this.http.get('http://127.0.0.1:8081/airports/topAirports')
    .map(response => response)
    .catch(this.handleError);
  }

  getTopAirlines() {
    return this.http.get('http://127.0.0.1:8081/airlines/topAirlines')
    .map(response => response)
    .catch(this.handleError);
  }
  
  // getFlightsOverbookedWithTime() {
  //   return this.http.get('http://127.0.0.1:8081/flights/retriveOverbookedFlightCount')
  //   .map(response => response)
  //   .catch(this.handleError);
  // }
  
  getDelayedFlightsWithTime() {
    return this.http.get('http://127.0.0.1:8081/flights/retriveDelayedFlightCount')
    .map(response => response)
    .catch(this.handleError);
  }

  getFlightsOverbookedListWithTime() {
    return this.http.get('http://127.0.0.1:8081/flights/retriveOverbookedFlight')
    .map(response => response)
    .catch(this.handleError);
  }
  
  getDelayedFlightsListWithTime() {
    return this.http.get('http://127.0.0.1:8081/flights/retriveDelayedFlight')
    .map(response => response)
    .catch(this.handleError);
  }

}
