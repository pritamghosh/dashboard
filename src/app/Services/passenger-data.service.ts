import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

@Injectable()
export class PassengerDataService {

  constructor(private http: Http) { }

  getAcceptedPassengersCount() {
    return this.http.get('http://127.0.0.1:8081/passengers/passengersAcceptedCount')
      .map(response => response)
      .catch(this.handleError);
  }

  getAcceptedPassengersList() {
    return this.http.get('http://127.0.0.1:8081/passengers/passengersAccepted')
      .map(response => response)
      .catch(this.handleError);
  }

  public handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json() || 'Server error');
  }

}
