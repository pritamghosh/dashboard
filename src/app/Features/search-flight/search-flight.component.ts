import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.scss']
})
export class SearchFlightComponent implements OnInit {
  searchData: any = [
    { "AIRLINE": "MH", "FLIGHT_ID": "192", "AIRPORT": "DEL", "STATUS_SUBCODE": "CL", "SUBSCRIBER": "MASAL", "HOUR": 10, "MINUTE": 30 },
    { "AIRLINE": "MH", "FLIGHT_ID": "217", "AIRPORT": "DEL", "STATUS_SUBCODE": "CL", "SUBSCRIBER": "MASAL", "HOUR": 10, "MINUTE": 30 },
    { "AIRLINE": "MH", "FLIGHT_ID": "370", "AIRPORT": "DEL", "STATUS_SUBCODE": "CL", "SUBSCRIBER": "MASAL", "HOUR": 10, "MINUTE": 30 },
    { "AIRLINE": "MH", "FLIGHT_ID": "580", "AIRPORT": "DEL", "STATUS_SUBCODE": "CL", "SUBSCRIBER": "MASAL", "HOUR": 10, "MINUTE": 30 },
    { "AIRLINE": "MH", "FLIGHT_ID": "690", "AIRPORT": "DEL", "STATUS_SUBCODE": "CL", "SUBSCRIBER": "MASAL", "HOUR": 10, "MINUTE": 30 },
    { "AIRLINE": "MH", "FLIGHT_ID": "243", "AIRPORT": "DEL", "STATUS_SUBCODE": "CL", "SUBSCRIBER": "MASAL", "HOUR": 10, "MINUTE": 30 },
    { "AIRLINE": "MH", "FLIGHT_ID": "899", "AIRPORT": "DEL", "STATUS_SUBCODE": "CL", "SUBSCRIBER": "MASAL", "HOUR": 10, "MINUTE": 30 },
    { "AIRLINE": "MH", "FLIGHT_ID": "921", "AIRPORT": "DEL", "STATUS_SUBCODE": "CL", "SUBSCRIBER": "MASAL", "HOUR": 10, "MINUTE": 30 },
    { "AIRLINE": "MH", "FLIGHT_ID": "100", "AIRPORT": "DEL", "STATUS_SUBCODE": "CL", "SUBSCRIBER": "MASAL", "HOUR": 10, "MINUTE": 30 }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }
  closeSearch() {
    this.router.navigate(['/home']);
  }
}
