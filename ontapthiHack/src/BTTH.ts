interface IAnimal {
    name: string;
    category: string;
    sound(): void;
    getDetails(): void;
    move(): void;
    feed(): void;
}
abstract class Animal implements IAnimal {
    name: string;
    private age: number;
    category: string;
    foodType: string;
    constructor(name: string, age: number, category: string, foodType: string) {
        this.age = age;
        this.category = category;
        this.foodType = foodType;
        this.name = name;
    }
    sound(): string {
        return "Âm thanh của động vật"
    }
    getDetails(): string {
        return `name: ${this.name}, age: ${this.age}, category: ${this.category}, food type: ${this.foodType}`
    }
    abstract move(): void;
    feed(): void {
        console.log("Ăn");
    }
}
class Mamal extends Animal {
    private furColor: string;
    constructor(name: string, age: number, category: string, foodType: string, furColor: string) {
        super(name, age, category, foodType)
        this.furColor = furColor
    }
    move() {
        console.log("Chạy");
    }
}
class Bird extends Animal {
    private furColor: string;
    move() {
        console.log("Bay");
    }
}
class Reptile extends Animal {
    private furColor: string;
    move() {
        console.log("Bò");
    }
}
let dog = new Mamal("John", 10, "Pet", "Meat", "Brown");