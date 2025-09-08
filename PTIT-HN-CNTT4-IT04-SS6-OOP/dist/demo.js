//OOP
class Animal {
    //abstract....
    //co method rieng cua no dc dinh nghia cho chinh no
    move() {
        console.log("phuong thuc di chuyen");
    }
}
class Cat extends Animal {
    //bat buoc ph trien khai method astract
    //di trien khai
    makeSound() {
        return ` tieng keu cua loai meo, meo meo!`;
    }
}
//neu la 1 abstract bat buoc chi dc dinh nghia trong abstract class.1 class co abstract sai k dinh
//interFace nhu ban hop dong cac class ph tuan theo no
