"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//1: dinh nghia lop Student vs cac thuoc tinh
class Student {
    id;
    age;
    email;
    //khoi toa doi tuong tren constructor
    constructor(id, age, email) {
        this.id = id;
        this.age = age;
        this.email = email;
    }
    //in ra thong tin
    displayInfo() {
        console.log(`ID:${this.id},age:${this.age},email:${this.email}`);
    }
}
//khai bao mang de chua cac sinh vien dc tao ra tu lop da dinh nghia
//tao 1 mang rong
let studentList = [];
//Tạo ra các thực thể sinh viên và lưu vào mảng, tiến hành duyệt mảng và in ra các sinh viên trong mảng.
let student1 = new Student(1, 20, "student1@gmail.com");
let student2 = new Student(2, 21, "student2@gmail.com");
let student3 = new Student(3, 22, "student3@gmail.com");
//them vao mang sdung push
studentList.push(student1);
studentList.push(student2);
studentList.push(student3);
//duyet mang va in ra thong tin sdung for of
for (let student of studentList) {
    student.displayInfo();
}
//# sourceMappingURL=bai2SS5.js.map