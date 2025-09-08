class Vehicle {
    public name: string;
    protected year:number;
    private company:string;
    readonly id:number;
    constructor(  name: string,year:number, company:string,id:number) {
        this .name=name;
        this.year=year;
        this.company=company;
        //Ngoài ra hãy thêm một thuộc tính mới là id và sử dụng từ khóa readonly để đảm bảo rằng id không thể thay đổi. 
        this.id=id;
        
    }
   public displayInfo():void{
    console.log(`id:${this.id}, name:${this.name},company:${this.company},year:${this.year}`);
    
   }
   protected getYear():number{
    return this.year;
   }
    private getCompany():string{
    return this.company;
   }

}
//tao thuc the
const myVehicle=new Vehicle("car",2023,"Vinfast",2025);
//goi thuc the de in ra
myVehicle.displayInfo();
//test case
console.log(myVehicle);

