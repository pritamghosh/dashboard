import { Component, ElementRef, OnDestroy, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
//import * as d3 from 'd3-selection';
import * as d3Scale from "d3-scale";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import { D3Service } from 'd3-ng2-service';


@Component({
  selector: 'app-linear-progress-chart',
  templateUrl: './linear-progress-chart.component.html',
  styleUrls: ['./linear-progress-chart.component.css']
})
export class LinearProgressChartComponent implements OnInit {
  @Input() flightsJson: any;
  @Input() flightsOverbookedJson: any;
  @Input() paxCountJson: any;
  private margin = { top: 20, right: 20, bottom: 30, left: 50 };
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private x_overbooked: any;
  private y_overbooked: any;
  //private svg: any;
  private flightDelayedLine: d3Shape.Line<[number, number]>;
  private flightOverBookedLine: d3Shape.Line<[number, number]>;
  private bookedPassengerLine: d3Shape.Line<[number, number]>;
  private parentNativeElement: any;
  private d3: any;
  private canvas: any;
  constructor(element: ElementRef, d3Service: D3Service) {
    this.width = 800 ;//- this.margin.left - this.margin.right;
    this.height = 400 ;//- this.margin.top - this.margin.bottom;
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    let progressGroup: any;
    this.x = d3Scale.scaleLinear().range([0, this.width]);
    this.y = d3Scale.scaleLinear().range([this.height, 0]);
    this.x.domain(d3Array.extent(this.flightsJson, (d: any) => d.time));
    this.y.domain(d3Array.extent(this.flightsJson, (d: any) => d.FlightCount));
    //this.x_overbooked = d3Scale.scaleTime().range([0, this.width]);
    //this.y_overbooked = d3Scale.scaleLinear().range([this.height, 0]);
    //this.x_overbooked.domain(d3Array.extent(this.flightsOverbookedJson, (d: any) => d.time ));
    //this.y_overbooked.domain(d3Array.extent(this.flightsOverbookedJson, (d: any) => d.FlightCount));


    this.canvas = this.d3.select(this.parentNativeElement)
      .append('svg')        // create an <svg> element
      .attr('width', this.width) // set its dimensions
      .attr('height', this.height)
      .attr("transform", "translate(" + (-200) + "," + 0 + ")");

    progressGroup = this.canvas.append("g");
    progressGroup.attr("class", "axis axis--x")

      //.attr("colour","black")
      .attr("class", "axis-title")
      .attr("transform", "translate(" + (-200) + "," + 100 + ")")
      .call(d3Axis.axisBottom(this.x));
    progressGroup.append("text").text("Time").attr("transform", "translate(" + (0) + "," + (200) + ")");

    progressGroup.attr("class", "axis axis--y")
      .call(d3Axis.axisLeft(this.y)
        .ticks(6, "s"))
      //.tickFormat(this.d3.format("s")))
      //.append("text")
      .attr("class", "axis-title")
      .attr("transform", "translate(" + (40) + "," + (70) + ")");

    progressGroup.append("text").attr("transform", "translate(" + (0) + "," + (50) + ")").text("Flight");
    this.flightsJson.sort(function (a, b) {
      return b["time"] - a["time"];
    });
    if (this.flightsOverbookedJson) {
      this.flightsOverbookedJson.sort(function (a, b) {
        return a["time"] - b["time"];
      });

    }

    this.flightDelayedLine = d3Shape.line()
      .x((d: any) => this.x(d.time))
      .y((d: any) => this.y(d.FlightCount))
      .curve(this.d3.curveMonotoneX);
    this.flightOverBookedLine = d3Shape.line()
      .x((d: any) => this.x_overbooked(d.time))
      .y((d: any) => this.y_overbooked(d.OverBookedCount))
      .curve(this.d3.curveMonotoneX);
    this.bookedPassengerLine = d3Shape.line()
      .x((d: any) => this.x(d.time))
      .y((d: any) => this.y(d.OverBookedCount))
      .curve(this.d3.curveMonotoneX);

    progressGroup.append("path")
      .datum(this.flightsJson)
      .attr("class", "line")
      .attr("d", this.flightDelayedLine)
      .attr("fill", "none")
      .attr("stroke-width", "5")
      .attr("stroke", "red")
      .attr("transform", "translate(" + (350) + "," + -100 + ")");

  }




}
