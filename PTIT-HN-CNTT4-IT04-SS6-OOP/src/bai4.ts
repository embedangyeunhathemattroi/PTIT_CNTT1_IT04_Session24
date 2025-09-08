
interface Geometry {
  
    calculateArea(): number;

    calculatePerimeter(): number;
}

class Circle implements Geometry {
    private radius: number;
    constructor(radius: number) {
        this.radius = radius;
    }

    // Cài đặt phương thức tính diện tích hình tròn
    calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }

    // Cài đặt phương thức tính chu vi hình tròn
    calculatePerimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}


class Rectangle implements Geometry {

    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    // Cài đặt phương thức tính diện tích hình chữ nhật
    calculateArea(): number {
        return this.width * this.height;
    }

    // Cài đặt phương thức tính chu vi hình chữ nhật
    calculatePerimeter(): number {
        return 2 * (this.width + this.height);
    }
}


const myCircle = new Circle(5); 
const myRectangle = new Rectangle(4, 6);

console.log("----- Hình Tròn -----");
console.log("Diện tích:", myCircle.calculateArea());
console.log("Chu vi:", myCircle.calculatePerimeter());

console.log("----- Hình Chữ Nhật -----");
console.log("Diện tích:", myRectangle.calculateArea());
console.log("Chu vi:", myRectangle.calculatePerimeter());
