class _Animal {
  protected name: string; 
     protected age: number ;
   public species: string ;
    constructor(name:string,age:number,species:string) {
        this.name=name;
        this.age=age;
        this.species=species
    }
    //phuong thuc method
    speak():void{
        console.log(`am thanh cua dongvat :${this.name}`);
        
    }

    //getter -phuong thuc cap nhat name
setName(new_name:string):void{
    this.name=new_name;
}
    
}

//khoi tao lop cho 
class dog extends _Animal{
     public breed:string;
      speak():void{
        console.log("am thanh : WOOOF");
        
    }

}

class cats extends _Animal{
     public breed:string;
     //nhung thuoc tinh doi tuong ay
     constructor(name:string,age:number,species:string,breed:string){
        //ghi nhung cai can ke thua, nhung cai gtri ke thua cho vao super
        super(name, age,species);
        this.breed=breed;
        //this.name=name;//ph co set de truy cap gtri no
        this.age=age;
        this.species=species;
     }
      speak():void{
        console.log("am thanh : Meow");
        
    }
    getInfo():string{
        return `ten : ${this.name}, tuoi: ${this.age},loai:${this.species}`

    }

}

class rabbit extends _Animal{
     public breed:string;
      speak():void{
        console.log("am thanh : Squeak");
        
    }

}
//chi truyen 1 cai thoi vi 3 cai kia ke thua r
let meomoe=new cats("meomeo1",2,"Meo","meo");
console.log(meomoe.getInfo());


//con muon truy cap dc cha ph la protected



