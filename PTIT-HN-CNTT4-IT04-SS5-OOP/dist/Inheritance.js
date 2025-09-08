//tinh ke thua
//1 class khi ke thua class cha thi se co cac thuoc tinh va phuong thuc cua class cha
class Animal {
    constructor(name) {
        this.name = name;
    }
    sound() {
        return `tieng keu cua : ${this.name}`;
    }
}
class Dogc extends Animal {
    sound() {
        return `tieng keu cua : ${this.name}  sua gau gau `;
    }
}
class Cat extends Animal {
    sound() {
        return `tieng keu cua meo: ${this.name} meow meow `;
    }
}
const dog1 = new Dogc("cho"); //truyen gia vao 
const cat1 = new Cat("meo");
console.log(cat1.sound);
console.log(dog1.sound);
