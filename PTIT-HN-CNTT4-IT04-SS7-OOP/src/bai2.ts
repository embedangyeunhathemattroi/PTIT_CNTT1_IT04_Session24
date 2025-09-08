class Vehicle {
    protected name: string;
    protected speed: number;
    protected id: number | string;

    constructor(name: string, speed: number, id: number | string) {
        this.name = name;
        this.speed = speed;
        this.id = id;
    }

    // Giảm tốc độ
    public slowDown(amount: number): string {
        if (amount <= 0) {
            return "Số giảm tốc phải lớn hơn 0!";
        }
        this.speed -= amount;
        if (this.speed < 0) this.speed = 0; // Không để tốc độ âm
        return `Giảm tốc thành công. Tốc độ hiện tại: ${this.speed} km/h`;
    }

    // Tăng tốc độ
    public speedUp(amount: number): void {
        if (amount <= 0) {
            console.log("Số tăng tốc phải lớn hơn 0!");
            return;
        }
        this.speed += amount;
    }

    // Hiển thị tốc độ
    public showSpeed(): void {
        console.log(` Tên: ${this.name}, Tốc độ hiện tại: ${this.speed} km/h, ID: ${this.id}`);
    }

    // In thông tin chung
    public printInfo(): void {
        console.log(`Tên: ${this.name}, Tốc độ: ${this.speed} km/h, ID: ${this.id}`);
    }
}

// Lớp Bicycle kế thừa Vehicle
class Bicycle extends Vehicle {
    private gear: number;

    constructor(name: string, speed: number, id: number | string, gear: number) {
        super(name, speed, id);
        this.gear = gear;
    }

    // Ghi đè phương thức in thông tin
    public override printInfo(): void {
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
