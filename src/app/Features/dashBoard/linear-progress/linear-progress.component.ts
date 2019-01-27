import { Component, OnInit, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { FlightsDelayedDataService } from '../../../services/flights-delayed-data.service';
import { PassengerDataService } from '../../../services/passenger-data.service';

@Component({
  selector: 'app-linear-progress',
  templateUrl: './linear-progress.component.html',
  styleUrls: ['./linear-progress.component.scss']
})
export class LinearProgressComponent implements OnInit, OnChanges {
  flightdelayedmap = new Map();
  overbookedmap = new Map();
  delayedFlight: any[] = [];
  overbkdFlight: any[] = [];
  flightDelayedList: Array<any> = new Array<any>();
  flightOverbookedList: Array<any> = new Array<any>();
  paxAcceptedList: Array<any> = new Array<any>();
  public lineChartData: Array<any>;
  public lineChartLabels: Array<any> = ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'];
  public lineChartOptions: any = {
    responsive: false,
    legend: { position: 'bottom' },
    scales: {
      yAxes: [{
        ticks: {
          min: 10,
          max: 150
        }
      }],
      xAxes: [{
        ticks: {
          min: 5,
          max: 8
        }
      }]
    }
  };

  public lineChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: '#FF0000',
      pointBackgroundColor: '#FF0000',
    },
    {
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: '#40E0D0',
      pointBackgroundColor: '#40E0D0',
    },
    {
      backgroundColor: 'rgba(77,83,96,0)',
      borderColor: '#4169E1',
      pointBackgroundColor: '#4169E1',
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor(private flightsDataService: FlightsDelayedDataService,
    private passengerDataService: PassengerDataService) {
  }
  ngOnChanges() {

  }
  ngOnInit() {
    this.updateChartData();
    this.updateLineChartData();
  }

  updateLineChartData() {
    this.lineChartData = [
      { data: this.flightDelayedList, label: 'Flights delayed' },
      { data: this.flightOverbookedList, label: 'Flights overbooked' },
      { data: this.paxAcceptedList, label: 'Pax accepted' }
    ];
  }
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  updateChartData() {
    let fltnumber :number=1;
    this.flightsDataService.getDelayedFlightsListWithTime().subscribe(
      result => {
        this.delayedFlight = JSON.parse(result._body);
        let flightNo = 1;
        this.delayedFlight.forEach(flightdelayed => {
          console.log(flightdelayed.HOUR+"--in delayed");
          if (this.flightdelayedmap.has(flightdelayed.HOUR)) {
            fltnumber = this.flightdelayedmap.get(flightdelayed.HOUR);
            //console.log(fltnumber);
            this.flightdelayedmap.set(flightdelayed.HOUR, fltnumber+1);
          } else {
            this.flightdelayedmap.set(flightdelayed.HOUR, 1);
          }
        });
        //console.log(this.flightdelayedmap);
        
        this.flightDelayedList.push(this.flightdelayedmap.get(12));
        this.flightDelayedList.push(this.flightdelayedmap.get(3));
        
        this.flightDelayedList.push(this.flightdelayedmap.get(6));
        //this.flightDelayedList.push(this.flightdelayedmap.get(8));
        this.flightDelayedList.push(24);
        this.flightDelayedList.push(this.flightdelayedmap.get(10));
        //console.log(this.flightdelayedmap.get(1));

        //this.lineChartLabels.push(this.map.keys);
        //console.log(this.lineChartLabels);
        //this.flightDelayedList = JSON.parse(result._body);
        this.updateLineChartData();
      },
      error => { console.error('Error in getting Delayed Flights List: ' + error) }
    );
    let fltoverbkdnumber :number=1;
    this.flightsDataService.getFlightsOverbookedListWithTime().subscribe(
      result => {
        this.overbkdFlight = JSON.parse(result._body);
        let flightNo = 1;
        this.overbkdFlight.forEach(flightoverbook => {
          console.log(flightoverbook.HOUR+"here-----");
          if (this.overbookedmap.has(flightoverbook.HOUR)) {
            fltoverbkdnumber = this.overbookedmap.get(flightoverbook.HOUR);
            //console.log(fltoverbkdnumber);
            this.overbookedmap.set(flightoverbook.HOUR, fltoverbkdnumber+1);
          } else {
            this.overbookedmap.set(flightoverbook.HOUR, 1);
          }
        });
        //console.log(this.overbookedmap);
        
        //this.flightDelayedList.push(this.flightdelayedmap.get(12));
        // this.flightDelayedList.push(this.overbookedmap.get(1));
        // this.flightDelayedList.push(this.overbookedmap.get(3));
        // this.flightDelayedList.push(this.overbookedmap.get(4));
        // this.flightDelayedList.push(this.overbookedmap.get(5));
        // this.flightDelayedList.push(this.overbookedmap.get(6));
        // this.flightDelayedList.push(this.overbookedmap.get(8));
        this.flightOverbookedList.push(this.overbookedmap.get(10));
        this.flightOverbookedList.push(this.overbookedmap.get(12));
        //this.flightOverbookedList = JSON.parse(result._body);
        this.updateLineChartData();
      },
      error => { console.error('Error in getting Flights Overbooked List: ' + error) }
    );

    this.passengerDataService.getAcceptedPassengersList().subscribe(
      result => {


        this.paxAcceptedList = JSON.parse(result._body);
        this.updateLineChartData();
      },
      error => { console.error('Error in getting Accepted Passengers List: ' + error) }
    );
  }
}
