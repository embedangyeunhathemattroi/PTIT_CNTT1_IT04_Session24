// Tạo interface Animal

interface IAnimal{
    // thuộc tính
    name:string,
    age:number,
    category:string|number|boolean,
    // phương thức 
    sound(): string,
    getDetail():string,
    move():string,
    feed():string,
}
// Tạo abstract class Animal
 abstract class Animal implements IAnimal{
    name:string;
    age:number;
    category: string|number|boolean
    constructor(name:string, age:number, category:string|number|boolean){
        this.name=name;
        this.age=age;
        this.category= category;
    }
    sound(): string{
        return ``
    }
    getDetail():string{
        return ``
    }
    move():string{
        return ``
    }
    feed():string{
        return ``
    }
 }

 // Tạo các class con kế thừa class Animal
 class Mammal extends Animal{
    private furColor: string;
    constructor(name:string, age:number,furColor: string){
        super(name,age,furColor);
        this.name=name;
        this.age=age;
        this.furColor= furColor
    }
    move():string{
        return `phương thức di chuyển của động vật có vú`
    }
    getFurColor():string{
        // lấy mầu lông của động vật có vú
        return ` màu lông của loài ${this.name} là : ${this.furColor}`
    }
 }
 class Bird  extends Animal{
   private wingSpan: number;
    constructor(name:string, age:number, wingSpan: number){
        super(name, age, wingSpan);
        this.name= name;
        this.age= age;
        this.wingSpan=wingSpan
    }
    move():string{
        return `phương thức di chuyển của chim`
    }
    getWingSpan():string{
        // lấy thông tin sải cánh của loài chim
        return ` sải cánh của loài: ${this.name} là: ${this.wingSpan}`
    }
 }
 class RepTitle extends Animal{
   private  venomous: boolean;
    constructor(name:string, age:number, venomous:boolean){
        super(name,age, venomous);
        this.name=name;
        this.age=age;
        this.venomous=venomous
    }
    move(): string {
        return `phương thức di chuyển của bò sát`
    }
 }
 // Tính đa hình là cùng 1 phương thức nhưng triển khai khác nhau
 const animal: Animal[]=[
    new Bird("Bird",2,5),
    new RepTitle("Rắn",2,true),
    new Mammal("Blue",2,"màu xanh"),
 ];
 // gọi phương thức
 animal.forEach(item=>{
    // thông tin di chuyển của các loài
    console.log(item.move());

    
 })
 // in thông tin màu lông của loài
const new_animal = new Mammal("con lợn", 1,"màu trằng"); 
console.log(new_animal.getFurColor());

 