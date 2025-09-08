"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class _Animal {
    name;
    age;
    species;
    constructor(name, age, species) {
        this.name = name;
        this.age = age;
        this.species = species;
    }
    //phuong thuc method
    speak() {
        console.log(`am thanh cua dongvat :${this.name}`);
    }
    //getter -phuong thuc cap nhat name
    setName(new_name) {
        this.name = new_name;
    }
}
//khoi tao lop cho 
class dog extends _Animal {
    breed;
    speak() {
        console.log("am thanh : WOOOF");
    }
}
class cats extends _Animal {
    breed;
    //nhung thuoc tinh doi tuong ay
    constructor(name, age, species, breed) {
        //ghi nhung cai can ke thua, nhung cai gtri ke thua cho vao super
        super(name, age, species);
        this.breed = breed;
        //this.name=name;//ph co set de truy cap gtri no
        this.age = age;
        this.species = species;
    }
    speak() {
        console.log("am thanh : Meow");
    }
    getInfo() {
        return `ten : ${this.name}, tuoi: ${this.age},loai:${this.species}`;
    }
}
class rabbit extends _Animal {
    breed;
    speak() {
        console.log("am thanh : Squeak");
    }
}
//chi truyen 1 cai thoi vi 3 cai kia ke thua r
let meomoe = new cats("meomeo1", 2, "Meo", "meo");
console.log(meomoe.getInfo());
//con muon truy cap dc cha ph la protected
//# sourceMappingURL=baitaptonghop.js.map