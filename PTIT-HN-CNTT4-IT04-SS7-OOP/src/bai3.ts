 
 abstract class Animal{
     protected name:string;
     //du la class hay abstract thi cx can constructor
     constructor(name:string){
        this.name=name;
     }
     //cac phuong thuc khac trong than ham
     public abstract makeNoise():void;

     //phuong thuc in ra ten
     public printName():void {
        console.log(`Name: ${this.name}`);     
     }

 }
//Định nghĩa 2 lớp Cat và Dog kế thừa lớp Animal. Phương thức makeNoise của lớp Cat sẽ in ra màn hình ”meo meo”, của lớp Dog sẽ in ra màn hình “gâu gâu”. 
class Catss extends Animal {
   public makeNoise(): void {
       console.log("meo meo ");
       
   }
}

class Dogss extends Animal {
   public makeNoise(): void {
       console.log("gau gau  ");
       
   }
}

//Tạo ra 2 đối tượng từ 2 lớp đã định nghĩa, gọi phương thức printName và makeNoise với mỗi đối tượng.
const poodle=new Dogss("white's pooodle");
poodle.printName();
poodle.makeNoise();

const EngLandCat=new Catss("white's EngLandCat");
EngLandCat.printName();
EngLandCat.makeNoise();
 
 
 