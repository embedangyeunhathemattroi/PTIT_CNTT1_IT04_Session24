"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Employee {
    name;
    company;
    phone;
    constructor(name, company, phone) {
        this.name = name;
        this.company = company;
        this.phone = phone;
    }
    printInfo() {
        console.log(`Ten nhan vien: name${this.name}, ten cty:company ${this.company}, so dien thoai :${this.phone}`);
    }
}
//Tạo ra một thực thể từ lớp Employee và gọi phương thức printInfo() để in ra các thuộc tính.
const employee = new Employee("Linh Pham Ngoc", "rikkei education", "346333333");
employee.printInfo();
//# sourceMappingURL=bai3SS5.js.map