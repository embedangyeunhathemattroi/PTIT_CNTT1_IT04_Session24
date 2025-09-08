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
// Abstract class Animal
class Animal1 {
    constructor(name, age, category) {
        this.name = name;
        this.age = age;
        this.category = category;
    }
    getDetail() {
        return `Tên: ${this.name}, Tuổi: ${this.age}, Loại: ${this.category}`;
    }
}
// Lớp Mammal
class Mammal extends Animal1 {
    constructor(name, age, furColor) {
        super(name, age, "Mammal");
        this.furColor = furColor;
    }
    sound() {
        return `${this.name} kêu: Grrr`;
    }
    move() {
        return `Động vật có vú ${this.name} di chuyển bằng 4 chân`;
    }
    feed() {
        return `${this.name} ăn thịt hoặc cỏ tùy loài`;
    }
    getFurColor() {
        return `Màu lông của loài ${this.name} là: ${this.furColor}`;
    }
}
// Lớp Bird
class Bird extends Animal1 {
    constructor(name, age, wingSpan) {
        super(name, age, "Bird");
        this.wingSpan = wingSpan;
    }
    sound() {
        return `${this.name} hót: Chip chip`;
    }
    move() {
        return `Loài chim ${this.name} bay trên trời`;
    }
    feed() {
        return `${this.name} ăn hạt hoặc sâu bọ`;
    }
    getWingSpan() {
        return `Sải cánh của loài ${this.name} là ${this.wingSpan} mét`;
    }
}
// Lớp Reptile
class Reptile extends Animal1 {
    constructor(name, age, venomous) {
        super(name, age, "Reptile");
        this.venomous = venomous;
    }
    sound() {
        return `${this.name} kêu: Ssssss`;
    }
    move() {
        return `Loài bò sát ${this.name} trườn trên mặt đất`;
    }
    feed() {
        return `${this.name} ăn thịt hoặc côn trùng`;
    }
    getVenomous() {
        return `Loài bò sát ${this.name} có độc: ${this.venomous}`;
    }
}
// Lớp Zookeeper
class Zookeeper {
    report(animal) {
        return `Báo cáo: ${animal.getDetail()}. ${animal.move()} ${animal.feed()}`;
    }
}
// --- Test ---
const animalList = [
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
