//1 : dinh nghia lop vehicle vs 3 thuoc tinh chinh --> sdung class
class vehicle {
    //lam moi khoi tao doi tuong tren bang constructor
    constructor(name, year, company) {
        this.name = name;
        this.year = year;
        this.company = company;
    }
    //in ra thong tin
    displayInfo() {
        console.log(`Name:${this.name},Year:${this.year},Company:${this.company}`);
    }
}
//dinh nghia xong lop vehicle thi tao 2 doi tuong tu lop Vehicle,vs gtri khac nhau cho cac thuoc tinh
const vehicle1 = new vehicle("Vinfast", 2025, "VinGroup");
const vehicle2 = new vehicle("Mazda", 2020, "Mazda");
//truy cap va in thong tin cua ca 2 doi tuong
vehicle1.displayInfo();
vehicle2.displayInfo();
