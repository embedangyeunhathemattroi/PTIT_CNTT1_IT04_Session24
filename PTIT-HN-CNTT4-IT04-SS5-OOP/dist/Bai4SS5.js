class Vehicle {
    constructor(name, year, company, id) {
        this.name = name;
        this.year = year;
        this.company = company;
        //Ngoài ra hãy thêm một thuộc tính mới là id và sử dụng từ khóa readonly để đảm bảo rằng id không thể thay đổi. 
        this.id = id;
    }
    displayInfo() {
        console.log(`id:${this.id}, name:${this.name},company:${this.company},year:${this.year}`);
    }
    getYear() {
        return this.year;
    }
    getCompany() {
        return this.company;
    }
}
//tao thuc the
const myVehicle = new Vehicle("car", 2023, "Vinfast", 2025);
//goi thuc the de in ra
myVehicle.displayInfo();
//test case
console.log(myVehicle);
