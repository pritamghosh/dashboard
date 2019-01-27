export class FlightAirport{
    constructor(
        public longitude: number,
        public latitude: number,
        public name:string,
        public staus:string,
        public total:number,
        public thouughCheckIn:number,
        public accepted:number,
        public denied:number,
        public tinme : string,
        public isLast : boolean
    ){}
}