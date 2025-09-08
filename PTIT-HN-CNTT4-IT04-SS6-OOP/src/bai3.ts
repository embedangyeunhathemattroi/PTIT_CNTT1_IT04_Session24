
abstract class Animal {
  // thuộc tính chung
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  // abstract method: KHÔNG có thân hàm, lớp con phải implement
  // -> dùng khi bạn muốn "ép" các lớp con phải cung cấp cách thực hiện riêng
  abstract makeNoise(): void;

  // normal method: có thân hàm, lớp con có thể dùng luôn hoặc override
  // -> dùng khi có hành vi mặc định cho mọi lớp con
  public eat(): void {
    console.log(`${this.name} is eating`);
  }
}

// Lớp con bắt buộc phải implement makeNoise()
class Cat extends Animal {
  makeNoise(): void {
    console.log("meo meo"); // implement riêng cho Cat
  }
}

class Dog extends Animal {
  makeNoise(): void {
    console.log("gâu gâu"); // implement riêng cho Dog
  }
}

// Demo polymorphism
const animals: Animal[] = [new Cat("Mimi"), new Dog("Lucky")];
animals.forEach(a => {
  a.makeNoise(); // gọi abstract method đã được implement ở lớp con
  a.eat();       // gọi method có thân hàm ở lớp cha
});

class Vehicle {
  start(): void {
    console.log("Engine starts (default behavior)");
  }

  // method có thân hàm, nhưng lớp con có thể override nếu muốn
  stop(): void {
    console.log("Engine stops");
  }
}

// Lớp con có thể override method hoặc dùng mặc định
class ElectricCar extends Vehicle {
  // override để thay đổi hành vi
  start(): void {
    console.log("Electric motor starts silently");
  }
}

const v = new Vehicle();
v.start(); // Engine starts (default behavior)

const tesla = new ElectricCar();
tesla.start(); // Electric motor starts silently
tesla.stop();  // Engine stops  (kế thừa hành vi mặc định)

