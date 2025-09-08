class Animal {
    constructor(name, age, category, foodType) {
        this.age = age;
        this.category = category;
        this.foodType = foodType;
        this.name = name;
    }
    sound() {
        return "Âm thanh của động vật";
    }
    getDetails() {
        return `name: ${this.name}, age: ${this.age}, category: ${this.category}, food type: ${this.foodType}`;
    }
    feed() {
        console.log("Ăn");
    }
}
class Mamal extends Animal {
    constructor(name, age, category, foodType, furColor) {
        super(name, age, category, foodType);
        this.furColor = furColor;
    }
    move() {
        console.log("Chạy");
    }
}
class Bird extends Animal {
    move() {
        console.log("Bay");
    }
}
class Reptile extends Animal {
    move() {
        console.log("Bò");
    }
}
let dog = new Mamal("John", 10, "Pet", "Meat", "Brown");
