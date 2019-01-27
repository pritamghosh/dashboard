import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { D3Service, D3 } from 'd3-ng2-service';


import { Http } from '@angular/http';

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.css']
})
export class GlobeComponent implements OnInit {


  private d3: D3;
  private locations = [];
  private svg : any;
  private path : any;
  private geojson :any;
  private yaw:  any;
  geoGenerator : any;
  projection : any;
  @ViewChild('myCanvas') canvasRef: ElementRef
  context: any;
  constructor(d3Service: D3Service,private http: Http) { 
    console.log('globe');
    
    this.d3 = d3Service.getD3();
     this.http.get('https://gist.githubusercontent.com/d3indepth/f28e1c3a99ea6d84986f35ac8646fac7/raw/c58cede8dab4673c91a3db702d50f7447b373d98/ne_110m_land.json')
                    .subscribe( (data) => {
                      this.geojson = data.json();                   
                    })
                      
                      
    
  }

  ngOnInit() {
  
    this.context = this.canvasRef.nativeElement.getContext('2d');
    this.projection = this.d3.geoOrthographic()
    .scale(300)
    .translate([600, 900]);

  this.geoGenerator = this.d3.geoPath()
  .projection(this.projection)
  .pointRadius(5)
  .context(this.context);

  
  this.yaw = 300;
  setInterval(() => {
    this.update(); 
    }, 500);
  }
 update() {
  this.projection.rotate([this.yaw, -45])

  this.context.clearRect(0, 0, 10000, 10000);

  
  this.context.beginPath();
  
  this.geoGenerator({type: 'FeatureCollection', features: this.geojson.features})
  this.context.strokeStyle = "rgb(212, 208, 208)";
  this.context.lineWidth = 0;
  this.context.fillStyle  = 'rgb(212, 208, 208)';
  this.context.fill();
  
  //this.context.stroke();

  // Graticule
  var graticule = this.d3.geoGraticule();
  this.context.beginPath();
  this.context.strokeStyle = '#ccc';
  this.geoGenerator(graticule());
  //this.context.stroke();
  this.yaw -= 1

  //London - New York
  this.context.beginPath();
  this.context.strokeStyle = 'black';
 console.log(
 this.geoGenerator({type: 'Feature', geometry: {type: 'LineString', coordinates: [[78.9629, 20.9629], [-0.0059, 40.7128]]}}));
  this.context.stroke();


  var circle = this.d3.geoCircle()
  .center([78.9629, 20.9629])
  .radius(2);


  this.context.beginPath();
this.geoGenerator(circle());
this.context.stroke();



}

public mouseHover(e) {
  console.log(this.geoGenerator.centroidLinePoint())
  console.log(this.geoGenerator.centroid([[78.9629, 20.9629], [-0.0059, 40.7128]]));
  
}




  
}



