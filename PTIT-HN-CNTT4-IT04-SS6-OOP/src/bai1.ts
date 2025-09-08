

abstract class Shape {
 
    name: string;

    constructor(name: string) { // 
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
    abstract getSize(): void;
}

class Rectangle extends Shape {
    width: number;
    height: number;

    constructor(name: string, width: number, height: number) {
        super(name);
        this.width = width;
        this.height = height;
    }

 
    getSize(): void {
        console.log(`Chiều rộng: ${this.width}, Chiều cao: ${this.height}`);
    }
}

// Khởi tạo một đối tượng hình chữ nhật
const rectangle = new Rectangle("My Rectangle", 5, 10);

// Gọi phương thức getName()
console.log(rectangle.getName());

// Gọi phương thức getSize()
rectangle.getSize(); 
