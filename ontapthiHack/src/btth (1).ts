// Tạo lớp động vật
class _Animal{
   protected name:string;
   protected age:number;
   public species: string;
    constructor(name:string, age:number, species:string){
        this.name=name;
        this.age=age;
        this.species=species
    }
    // phương thức
    speak(): void{
        console.log(` âm thanh của con vật: ${this.name}`);
    }
    // phương cập nhật name
    setName(new_name:string): void{
        this.name= new_name;
    }
}
// Khởi tạo lớp Chó
class _Dog extends _Animal{
  public  breed: string;
    speak(): void {
        console.log("âm thanh: Woof!"); 
    }
}
class __Cat extends _Animal{
   public breed: string;
   constructor( name:string,age:number, species:string, breed:string){
    super(name,age,species);
    this.age=age;
    this.species=species;
    this.breed=breed;
   }
    speak(): void {
        console.log("âm thanh: Meow!");
    }
    getInfo():string{
        return `tên: ${this.name}, tuổi: ${this.age},loài :${this.species}` 
    }
    
}
class _Rabbit   extends _Animal{
    breed: string;
    speak(): void {
        console.log("âm thanh: Squeak!");
    }
}
let meomeo= new __Cat("meomeo1",2,"meo","mèo");

console.log(meomeo.getInfo());





