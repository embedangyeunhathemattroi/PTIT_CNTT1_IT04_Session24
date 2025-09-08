class Studentss {
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
