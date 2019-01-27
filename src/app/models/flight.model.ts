import { FlightAirport } from "./flight.airport.model.details";

export class Flight{
    constructor(
        public number:string,
        public routing : string,
        public airports : FlightAirport[]
    ){}
}