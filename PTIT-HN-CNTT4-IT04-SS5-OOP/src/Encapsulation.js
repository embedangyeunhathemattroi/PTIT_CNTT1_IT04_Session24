"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Studentss {
    fullName; //ko dien tu hieu la public vi no truy cap bth ben ngoai
    age;
    address; //chi truy cap trong class va class con ke thua class cha
    //ham tao
    constructor(value_fullName, value_age, address) {
        this.fullName = value_fullName;
        this.age = value_age;
        //this.address=value_address;
        this.address = address;
    }
    getInfo() {
        return `Xin chao ${this.fullName}, ${this.age}tuoi `;
    }
    //cap nhat lai
    setAge(new_age) {
        this.age = new_age;
    }
}
let SV1 = new Studentss("Linh", 20, "HN"); //sv1 dc goi 1 instance lop student
// SV1.setAge(22);
//
console.log(SV1.getInfo());
//# sourceMappingURL=Encapsulation.js.map