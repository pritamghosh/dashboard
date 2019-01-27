import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { D3Service } from 'd3-ng2-service';
import { ChartsModule } from 'ng2-charts/ng2-charts';


import { AppComponent, routing } from './app.component';
import { RadialProgressChartComponent } from './modules/charts/radial-progress-chart-component/radial-progress-chart.component';
import { FlightsDelayedDataService } from './services/flights-delayed-data.service';
import { PassengerDataService } from './services/passenger-data.service';
import { RadialProgressComponent } from './features/dashboard/radial-progress-component/radial-progress.component';
import { AccordionFlightreportComponent } from './features/dashboard/accordion-flightreport-component/accordion-flightreport.component';
import { LinearProgressComponent } from './features/dashboard/linear-progress/linear-progress.component';
import { LinearProgressChartComponent } from './modules/charts/linear-progress-chart/linear-progress-chart.component';
import { HomeComponent } from './features/home/home.component';
import { SearchFlightComponent } from './features/search-flight/search-flight.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { GlobeComponent } from './Modules/globe/globe.component';
import { TestComponent } from './Modules/test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    RadialProgressChartComponent,
    RadialProgressComponent,
    AccordionFlightreportComponent,
    LinearProgressComponent,
    LinearProgressChartComponent,
    HomeComponent,
    SearchFlightComponent,
    DashboardComponent,
    GlobeComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    routing,
    AlertModule.forRoot(),
    AccordionModule.forRoot()
  ],
  providers: [FlightsDelayedDataService, D3Service, PassengerDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
