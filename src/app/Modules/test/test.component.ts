import { Component, OnInit } from '@angular/core';
import { D3Service, D3 } from 'd3-ng2-service';
import { GeoPath } from 'd3-geo';
import { Http } from '@angular/http';
import { FlightAirport } from '../../models/flight.airport.model.details';
import { Flight } from '../../models/flight.model';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  private d3: D3;
  private geojson: any;
  private svg: any;

  width = 800;
  height = 800;
  config = {
    speed: 0.005,
    verticalTilt: -30,
    horizontalTilt: -30
  }
  private projection: any;
  private initialScale: any;
  private path: any;
  private center: any;
  private yaw = 300;
  private flight: Flight

  constructor(d3Service: D3Service, private http: Http) {
    this.d3 = d3Service.getD3();
    this.http.get('https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json')
      .subscribe((data) => {
        this.geojson = data.json();
        this.update()

      })

    let airportKUL = new FlightAirport(2.7456, 101.7072, 'KUL', 'Pre flight', 100, 100, 100, 100, "12:40", false)
    let airportJFK = new FlightAirport(40.6413, 73.7781, 'JFK', 'Open', 100, 100, 100, 100, "10:20", false)
    let airportLHR = new FlightAirport(51.4700, 0.4543, 'LHR', 'Pre flight', 100, 100, 100, 100, "15:30", true)
    this.flight = new Flight("MH 320", "JFK-KUL-LHR", [airportKUL, airportJFK, airportLHR])
  }

  ngOnInit() {

    // this.d3.select('div')
    // .append('svg')
    // .attr('width',250).attr('height', 400)
    // .attr('fill',  'red'      )
    // .append('text')
    // .text( 'sexy')
    // .attr("font-family", "sans-serif")
    //   .attr("font-size", "220px")
    //   .attr('fill',  'steelblue'      )
    // ;
    this.svg = this.d3.select('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .style("border-radius", "400px");

    this.projection = this.d3.geoOrthographic().scale(400).translate([this.width / 2, this.height / 2]);
    this.initialScale = this.projection.scale();
    this.path = this.d3.geoPath().projection(this.projection)
    this.center = [this.width / 2, this.height / 2];
    // setInterval(() => {
    //   this.enableRotation()

    // }, 130);

  }

  update() {


    this.projection.rotate([this.yaw, this.config.verticalTilt, this.config.horizontalTilt]);

    this.svg.selectAll(".segment")
      .data(this.geojson.features)
      .enter().append("path")
      .attr("class", "segment")
      .attr("d", this.path)
      .style("stroke", "#444")
      .style("stroke-width", "1px")
      .style("fill", (d, i) => '#aaa')
      .style("opacity", ".6");
    //locations = locationData;
    this.drawMarkers();
    //  this.svg.selectAll("path").attr("d", this.path);



  }

  drawMarkers() {
    this.svg.selectAll("g").remove();
    const markerGroup = this.svg.append('g');
    const markers = markerGroup.selectAll('text')
      .data(this.flight.airports);
    markers
      .enter()
      .append('text')
      .merge(markers)
      .text(function (d) { return d.name })
      .attr('x', d => this.projection([d.longitude, d.latitude])[0])
      .attr('y', d => this.projection([d.longitude, d.latitude])[1])
      .attr("font-family", "sans-serif")
      .attr("font-size", "20px")
      .attr('fill', d => {
        let gdistance = this.d3.geoDistance([d.longitude, d.latitude], this.projection.invert(this.center));

        return gdistance > 1.57 ? 'none' : 'red';
      })

    markerGroup.selectAll('circle')
      .data(this.flight.airports)
      .enter()
      .append('circle')
      .merge(markers)
      .attr('cx', d => this.projection([d.longitude, d.latitude])[0])
      .attr('cy', d => this.projection([d.longitude, d.latitude])[1])
      .attr('fill', 'none')
      .attr("stroke-width", 2)
      .attr("stroke", d => {
        const coordinate = [d.longitude, d.latitude];
        let gdistance = this.d3.geoDistance([d.longitude, d.latitude], this.projection.invert(this.center));
        return gdistance > 1.57 ? 'none' : 'steelblue';
      })
      .attr('r', 7);
    markerGroup.selectAll('circle.p')
      .data(this.flight.airports)
      .enter()
      .append('circle')
      .merge(markers)
      .attr('cx', d => this.projection([d.longitude, d.latitude])[0])
      .attr('cy', d => this.projection([d.longitude, d.latitude])[1])
      .attr('fill', d => {
        const coordinate = [d.longitude, d.latitude];
        let gdistance = this.d3.geoDistance([d.longitude, d.latitude], this.projection.invert(this.center));
        return gdistance > 1.57 ? 'none' : 'black';
      })
      .attr('r', 2);


    let coordinates = [];
    this.flight.airports.forEach(element => {
      coordinates.push([element.longitude, element.latitude])
    });
    console.log(coordinates);
    
    let pathString = this.path({ type: 'Feature', geometry: { type: 'LineString', coordinates: coordinates } })

    markerGroup.append("path")
      .attr("class", "path")
      .attr("d", pathString)
      .style("stroke", "black")
      .style("stroke-width", "3px")
      .style("stroke-dasharray", "0.5, 10")
      .style("stroke-linecap", "round")
      .style("fill", 'none')
    // .style("opacity", ".6");
    // markerGroup.each(function () {
    //   this.parentNode.appendChild(this);
    // });
  }

  enableRotation(isLeft = true) {
    if (isLeft) {
      this.yaw -= 10
    }
    else {
      this.yaw += 10
    }
    this.projection.rotate([this.yaw, this.config.verticalTilt, this.config.horizontalTilt]);
    this.svg.selectAll("path").attr("d", this.path);
    this.drawMarkers();
  };

}
