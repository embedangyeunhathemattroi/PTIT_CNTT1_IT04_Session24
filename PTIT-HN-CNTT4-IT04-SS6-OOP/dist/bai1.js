class Shape {
    contructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
class Rectangle extends Shape {
    constructor(width, height, name) {
        super(name);
        this.width = width;
        this.height = height;
    }
    getSize() {
        console.log(`width:${this.width},height:${this.height}`);
    }
}
const rectangle = new Rectangle("my Rectangle", 5, 10);
console.log(rectangle.getName());
rectangle.ize();
