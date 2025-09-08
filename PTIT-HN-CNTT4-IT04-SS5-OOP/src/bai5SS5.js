"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rectangle {
    width;
    height;
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    //Cung cấp phương thức để truy cập và thay đổi giá trị của 2 thuộc tính này
    getWidth() {
        return this.width;
    }
    //thiet lap cho wwidth
    setWidth(width) {
        this.width = width;
    }
    getHeight() {
        return this.height;
    }
    //thiet lap cho wwidth
    setHeight(height) {
        this.height = height;
    }
    //     //Thêm 2 phương thức vào lớp Rectangle:
    // Tính diện tích: Phương thức trả về diện tích hình chữ nhật (width * height).
    caculateArea() {
        return this.width * this.height;
    }
    // Tính chu vi: Phương thức trả về chu vi hình chữ nhật 
    caculatePerimeter() {
        return 2 * (this.width + this.height);
    }
}
// Khởi tạo đối tượng Rectangle:
// Tạo một đối tượng từ lớp Rectangle.
const rectangle = new Rectangle(5, 10);
// In ra chiều dài, chiều rộng, chu vi và diện tích của đối tượng.
console.log("Width", rectangle.getWidth());
console.log("Height", rectangle.getHeight());
console.log("Area", rectangle.caculateArea());
console.log("Perimeter:", rectangle.caculatePerimeter());
rectangle.setHeight(4);
rectangle.setWidth(7);
// Cập nhật lại kích cỡ của đối tượng và thực hiện lại các phép tính (diện tích, chu vi) sau khi cập nhật.
console.log("updated Width", rectangle.getWidth());
console.log("Updated Height", rectangle.getHeight());
console.log("Updated Area", rectangle.caculateArea());
console.log("Updated Perimeter:", rectangle.caculatePerimeter());
//# sourceMappingURL=bai5SS5.js.map