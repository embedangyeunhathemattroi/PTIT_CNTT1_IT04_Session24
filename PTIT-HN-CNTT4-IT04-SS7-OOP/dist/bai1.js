// Định nghĩa class Employee
class Employee {
    // Constructor khởi tạo đối tượng
    constructor(name, phone, company) {
        this.name = name;
        this.phone = phone;
        this.company = company;
    }
    // Phương thức in thông tin
    printInfo() {
        console.log(`Name: ${this.name}, Phone: ${this.phone}, Company: ${this.company}`);
    }
}
// Định nghĩa class Manager kế thừa Employee
class Manager extends Employee {
    // Constructor nhận thêm teamSize
    constructor(name, phone, company, teamSize) {
        super(name, phone, company); // Gọi constructor của Employee
        this.teamSize = teamSize;
    }
    // Ghi đè phương thức in thông tin
    printInfo() {
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
