// Định nghĩa class Employee
class Employee {
    public name: string;     
    protected phone: string;  
    private company: string;   

    // Constructor khởi tạo đối tượng
    constructor(name: string, phone: string, company: string) {
        this.name = name;
        this.phone = phone;
        this.company = company;
    }

    // Phương thức in thông tin
    public printInfo(): void {
        console.log(`Name: ${this.name}, Phone: ${this.phone}, Company: ${this.company}`);
    }
}

// Định nghĩa class Manager kế thừa Employee
class Manager extends Employee {
    public teamSize: number;

    // Constructor nhận thêm teamSize
    constructor(name: string, phone: string, company: string, teamSize: number) {
        super(name, phone, company); // Gọi constructor của Employee
        this.teamSize = teamSize;
    }

    // Ghi đè phương thức in thông tin
    public printInfo(): void {
        super.printInfo(); 
        console.log(`Team Size: ${this.teamSize}`);
    }
}

// Tạo 2 đối tượng Employee và Manager
const employee = new Employee("Vinfast", "2303020828", "VinGroup");
const manager = new Manager("Pham Linh", "0234433633182", "Ocean Park", 20);

// In thông tin cả 2
employee.printInfo();
manager.printInfo();
