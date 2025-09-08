
interface ChangeSpeed {
    speedUp(amount: number): void;   // Tăng tốc
    slowDown(amount: number): void;  // Giảm tốc
    stop(): void;                    // Dừng xe
}


class Vehicle implements ChangeSpeed {

    private speed: number;


    constructor(initialSpeed: number = 0) {
        this.speed = initialSpeed;
    }

    // Tăng tốc
    speedUp(amount: number): void {
        this.speed += amount;
        console.log(`🚗 Tăng tốc +${amount} km/h. Tốc độ hiện tại: ${this.speed} km/h`);
    }

    // Giảm tốc
    slowDown(amount: number): void {
        this.speed -= amount; // Giảm tốc độ
        if (this.speed < 0) this.speed = 0; // Không để tốc độ âm
        console.log(` Giảm tốc -${amount} km/h. Tốc độ hiện tại: ${this.speed} km/h`);
    }

   
    stop(): void {
        this.speed = 0; // Tốc độ = 0
        console.log(` Dừng xe. Tốc độ hiện tại: ${this.speed} km/h`);
    }
}

const myCar = new Vehicle(10);

myCar.speedUp(20);   
myCar.slowDown(15); 
myCar.stop();       
