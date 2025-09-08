
class vehicle{
    name: string;
    year: number;
    company:string;

constructor(name:string,year:number,company:string){
    this.name=name;
    this.year=year;
    this.company=company;
}

displayInfo():void{
    console.log(`Name:${this.name},Year:${this.year},Company:${this.company}`);
    
}
}

const vehicle1=new vehicle("Vinfast",2025,"VinGroup");
const vehicle2=new vehicle("Mazda",2020,"Mazda");


vehicle1.displayInfo();
vehicle2.displayInfo();
