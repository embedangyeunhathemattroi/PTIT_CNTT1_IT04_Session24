// Tạo lớp động vật
class _Animal {
    constructor(name, age, species) {
        this.name = name;
        this.age = age;
        this.species = species;
    }
    // phương thức
    speak() {
        console.log(` âm thanh của con vật: ${this.name}`);
    }
    // phương cập nhật name
    setName(new_name) {
        this.name = new_name;
    }
}
// Khởi tạo lớp Chó
class _Dog extends _Animal {
    speak() {
        console.log("âm thanh: Woof!");
    }
}
class __Cat extends _Animal {
    constructor(name, age, species, breed) {
        super(name, age, species);
        this.age = age;
        this.species = species;
        this.breed = breed;
    }
    speak() {
        console.log("âm thanh: Meow!");
    }
    getInfo() {
        return `tên: ${this.name}, tuổi: ${this.age},loài :${this.species}`;
    }
}
class _Rabbit extends _Animal {
    speak() {
        console.log("âm thanh: Squeak!");
    }
}
let meomeo = new __Cat("meomeo1", 2, "meo", "mèo");
console.log(meomeo.getInfo());
