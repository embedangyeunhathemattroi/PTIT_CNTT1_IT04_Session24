// Tạo interface Animal
// Tạo abstract class Animal
class Animal {
    constructor(name, age, category) {
        this.name = name;
        this.age = age;
        this.category = category;
    }
    sound() {
        return ``;
    }
    getDetail() {
        return ``;
    }
    move() {
        return ``;
    }
    feed() {
        return ``;
    }
}
// Tạo các class con kế thừa class Animal
class Mammal extends Animal {
    constructor(name, age, furColor) {
        super(name, age, furColor);
        this.name = name;
        this.age = age;
        this.furColor = furColor;
    }
    move() {
        return `phương thức di chuyển của động vật có vú`;
    }
    getFurColor() {
        // lấy mầu lông của động vật có vú
        return ` màu lông của loài ${this.name} là : ${this.furColor}`;
    }
}
class Bird extends Animal {
    constructor(name, age, wingSpan) {
        super(name, age, wingSpan);
        this.name = name;
        this.age = age;
        this.wingSpan = wingSpan;
    }
    move() {
        return `phương thức di chuyển của chim`;
    }
    getWingSpan() {
        // lấy thông tin sải cánh của loài chim
        return ` sải cánh của loài: ${this.name} là: ${this.wingSpan}`;
    }
}
class RepTitle extends Animal {
    constructor(name, age, venomous) {
        super(name, age, venomous);
        this.name = name;
        this.age = age;
        this.venomous = venomous;
    }
    move() {
        return `phương thức di chuyển của bò sát`;
    }
}
// Tính đa hình là cùng 1 phương thức nhưng triển khai khác nhau
const animal = [
    new Bird("Bird", 2, 5),
    new RepTitle("Rắn", 2, true),
    new Mammal("Blue", 2, "màu xanh"),
];
// gọi phương thức
animal.forEach(item => {
    // thông tin di chuyển của các loài
    console.log(item.move());
});
// in thông tin màu lông của loài
const new_animal = new Mammal("con lợn", 1, "màu trằng");
console.log(new_animal.getFurColor());
