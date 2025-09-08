// //tao interface IAnimal
// interface IAnimal{
//     //thuoc tinh
//     name :string, //Tên của động vật.
// age :number, // Tuổi của động vật.
// category :string| number|boolean; // Thể loại động vật (ví dụ: thú có vú, chim, bò sát).
// //phuong thuc
// //khai bao ham thoi k trien khai
// sound():string,
// getDetails():string,
// move():string,
// feed():string,


// }

// //b2: tao abstract class Animal
// //di trien khai cai tren bang implement 
// abstract class Animals implements IAnimal{
//         //thuoc tinh
//     name :string; //Tên của động vật.
// age :number; // Tuổi của động vật.
// category :string|number|boolean; // Thể loại động vật (ví dụ: thú có vú, chim, bò sát).
// //phuong thuc
// constructor(name:string,age:number,category:string|number|boolean){
//     this.name=name;
//     this.category=category;
//     this.age=age;

// }
// sound():string{
//     return `con meo keu meo meo `;
// }
// getDetails():string{
//     return ``;
// }
// move():string{
//     return ``;
// }
// feed():string{
//     return ``;
// }


// }

// //B3:tao lop con ke thu gom dv co vu , chim , bo satke thua class Animal
// class Mamal extends Animals { //giong class dong 19
//   private  furColor:string;
//     constructor(name:string,age:number,furColor:string){
//         //ke thua thi ph super
//         super(name,age,furColor);
//         this.name=name;
//         this.age=age;
//         this.furColor=furColor

//     }
//     move():string{
//         return `phuong thuc di chuyen DV co Vu`;
//     }
    
//         getfurColor():string{
//         //lay thong tin sai canh loai chim
//         return `sai canh cua loa ${this.name} la ${this.getfurColor}`
// }
// }


// //tao lop con ke thu gom dv co vu , chim , bo satke thua class Animal
// class Bird extends Animals { //giong class dong 19
//    private wingSpan:number|string;
//     constructor(name:string,age:number,   wingSpan:number){
//         //ke thua thi ph super
//         super(name,age,wingSpan);
//         this.name=name;
//         this.age=age;
//         this. wingSpan=wingSpan

//     }
//     move():string{
//         return `phuong thuc di chuyenChim`;
//     }
    
//         getWingSpan():string{
//         //lay thong tin sai canh loai chim
//         return `sai canh cua loa ${this.name} la ${this.getWingSpan}`
// }
// }


// //tao lop con ke thu gom dv co vu , chim , bo satke thua class Animal
// class Reptitle extends Animals { //giong class dong 19
//    private venomous:boolean;
//     constructor(name:string,age:number, venomous:boolean){
//         //ke thua thi ph super
//         super(name,age,venomous);
//         this.name=name;
//         this.age=age;
//         this. venomous=venomous

//     }
//     move():string{
//         return `phuong thuc di chuyen Bo Sat`;
//     }

//     }

//         getVenomous():string{
//         //lay thong tin sai canh loai chim
//         return `sai canh cua loa ${this.name} la ${this.getVenomous}`;
//     }


// //B4: DA HINH
// //tao 1 mang dong vat chua cac doi tuong tu cac lop con Mammal, bird , reptitle=====cung 1 phuong thuc goi ra nhieu cai trien khai khac nhau
// //B4.1: tao doi tuong
// const animal:Animals[]=[
//   new Bird("chim",2, 5),
//   new Reptitle("Ran",2, true),
//   new Mamal("Tho",2, "mau trang"),   

// ];
// //goi phuong thuc de in ra va co the sdung console.log thay return de duyet qua mang dong vat va goi phuong thuc move va sound cho tat ca dv
// animal.forEach(item=>{
//     //thong tin di chuyen cac loai

//     console.log( item.move());
     
// })
// //in thong tin mau long cua loai
// const new_animal=new Mamal("con lon",1,",mau trang");
// console.log(new_animal.getFullColor());





// //B5:Pham vi truy cap DONG GOp ph chuyen qua private o thuoc tinh ket thua cac lop con
// //vi theo de bai Các thuộc tính như age, furColor, venomous cần được đóng gói và bảo vệ (private fields).
// //B5.2: cung cap cac phuong thuc get va set de truy cap 


// Interface cho động vật
interface Animal11 {
    name: string;
    age: number;
    category: string | number | boolean;

    sound(): string;
    getDetail(): string;
    move(): string;
    feed(): string;
}

// Abstract class Animal
abstract class Animal1 implements Animal11 {
    name: string;
    age: number;
    category: string | number | boolean;

    constructor(name: string, age: number, category: string | number | boolean) {
        this.name = name;
        this.age = age;
        this.category = category;
    }

    abstract sound(): string; // bắt buộc class con override
    abstract move(): string;
    abstract feed(): string;

    getDetail(): string {
        return `Tên: ${this.name}, Tuổi: ${this.age}, Loại: ${this.category}`;
    }
}

// Lớp Mammal
class Mammal extends Animal1 {
    private furColor: string;

    constructor(name: string, age: number, furColor: string) {
        super(name, age, "Mammal");
        this.furColor = furColor;
    }

    sound(): string {
        return `${this.name} kêu: Grrr`;
    }

    move(): string {
        return `Động vật có vú ${this.name} di chuyển bằng 4 chân`;
    }

    feed(): string {
        return `${this.name} ăn thịt hoặc cỏ tùy loài`;
    }

    getFurColor(): string {
        return `Màu lông của loài ${this.name} là: ${this.furColor}`;
    }
}

// Lớp Bird
class Bird extends Animal1 {
    private wingSpan: number;

    constructor(name: string, age: number, wingSpan: number) {
        super(name, age, "Bird");
        this.wingSpan = wingSpan;
    }

    sound(): string {
        return `${this.name} hót: Chip chip`;
    }

    move(): string {
        return `Loài chim ${this.name} bay trên trời`;
    }

    feed(): string {
        return `${this.name} ăn hạt hoặc sâu bọ`;
    }

    getWingSpan(): string {
        return `Sải cánh của loài ${this.name} là ${this.wingSpan} mét`;
    }
}

// Lớp Reptile
class Reptile extends Animal1 {
    private venomous: boolean;

    constructor(name: string, age: number, venomous: boolean) {
        super(name, age, "Reptile");
        this.venomous = venomous;
    }

    sound(): string {
        return `${this.name} kêu: Ssssss`;
    }

    move(): string {
        return `Loài bò sát ${this.name} trườn trên mặt đất`;
    }

    feed(): string {
        return `${this.name} ăn thịt hoặc côn trùng`;
    }

    getVenomous(): string {
        return `Loài bò sát ${this.name} có độc: ${this.venomous}`;
    }
}

// Lớp Zookeeper
class Zookeeper {
    report(animal: Animal1): string {
        return `Báo cáo: ${animal.getDetail()}. ${animal.move()} ${animal.feed()}`;
    }
}

// --- Test ---
const animalList: Animal11[] = [
    new Bird("Chim én", 2, 0.25),
    new Reptile("Cá sấu", 5, false),
    new Mammal("Chó", 3, "Nâu"),
];

animalList.forEach(item => {
    console.log(item.move());
});

const newAnimal = new Mammal("Heo", 1, "Hồng");
console.log(newAnimal.getFurColor());

const zookeeper = new Zookeeper();
const lion = new Mammal("Sư tử", 6, "Vàng");
console.log(zookeeper.report(lion));
