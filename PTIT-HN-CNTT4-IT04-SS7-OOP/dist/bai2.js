class Vehicle {
    constructor(name, speed, id) {
        this.name = name;
        this.speed = speed;
        this.id = id;
    }
    // Giảm tốc độ
    slowDown(amount) {
        if (amount <= 0) {
            return "Số giảm tốc phải lớn hơn 0!";
        }
        this.speed -= amount;
        if (this.speed < 0)
            this.speed = 0; // Không để tốc độ âm
        return `Giảm tốc thành công. Tốc độ hiện tại: ${this.speed} km/h`;
    }
    // Tăng tốc độ
    speedUp(amount) {
        if (amount <= 0) {
            console.log("Số tăng tốc phải lớn hơn 0!");
            return;
        }
        this.speed += amount;
    }
    // Hiển thị tốc độ
    showSpeed() {
        console.log(` Tên: ${this.name}, Tốc độ hiện tại: ${this.speed} km/h, ID: ${this.id}`);
    }
    // In thông tin chung
    printInfo() {
        console.log(`Tên: ${this.name}, Tốc độ: ${this.speed} km/h, ID: ${this.id}`);
    }
}
// Lớp Bicycle kế thừa Vehicle
class Bicycle extends Vehicle {
    constructor(name, speed, id, gear) {
        super(name, speed, id);
        this.gear = gear;
    }
    // Ghi đè phương thức in thông tin
    printInfo() {
        super.printInfo();
        console.log(`Số bánh răng (Gear): ${this.gear}`);
    }
}
// ===== Test chương trình =====
const myBike = new Bicycle("Xe đạp Việt Nam", 2, 1, 4);
console.log(" Giá trị ban đầu:");
myBike.printInfo();
console.log("\n Tăng tốc lên 5:");
myBike.speedUp(5);
myBike.showSpeed();
console.log("\n Giảm tốc về 5:");
console.log(myBike.slowDown(2)); // Giảm 2
myBike.showSpeed();
console.log("\nCập nhật lại thông tin:");
myBike.printInfo();
