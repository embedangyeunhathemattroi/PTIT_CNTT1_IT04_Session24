function echoString(value) {
    return value;
}
function echoNumber(value) {
    return value;
}
console.log(echoNumber(5));
console.log(echoString("hello Rikkei"));
//can viet lai kham , gay mat linh hoat
//generic giup vc do
//T nay tra ve dc nhieu kieu
function echo(value) {
    return value;
}
console.log(echo(true));
console.log(echo("hello ban "));
console.log(echo(3));
let resultGeneric = echo(5);
//result.toLowerCase();  //giup phat hien loi som va tranh bi trung lap 
//Syntax: function identity<T>(arg:T):T: cu phap trien khai parameter 
//co the sdung any
function echoAny(value) {
    return value;
}
//let result=echoAny(5); //tu truyen vao doi so
//result.toLowerCase(); //khi chay moi loi, no se la 1 function vi day chi sdung vs du lieu chuoi 
//đối vs kieu dlieu generic
//tiep b2
function identity(value) {
    return value;
}
//co the them dau <> de ep kieu --lap tinh gtri truyen vao ph dung
const result = identity(3);
console.log(result);
//ham generic nhan vao 2 tham so
function pair(first, second) {
    return [first, second];
}
const resultPair = pair("PTIT", 20);
console.log(resultPair);
function checkElement(arr, conditionFn) {
    for (const item of arr) { //check tung item mang array
        if (conditionFn(item))
            return item; //neu ton tai 
    }
    return undefined;
}
const number = [1, 2, 3, 4, 5];
const firstEven = checkElement(number, (item) => item % 2 == 0); //tim ra ptu dau la so chan ,Pk TMDK 
console.log(firstEven); //ra ptu dau tien la so chan la 2 :TMDk
const fruit = ["apple", "banana", "lemon"];
const startsWith = checkElement(fruit, (item) => item.startsWith("1")); //thoa man
console.log(startsWith);
//generic class
class NumbrBox {
    constructor(value) {
        this.value = value;
    }
}
class StringBox {
    constructor(value) {
        this.value = value;
    }
}
//lam vs du lieu ch XD trong generic
class Box {
    constructor(value) {
        this.value = value;
    }
}
//di ep kieu
const numberBox = new Box(123);
const stringBox = new Box("mothaiba");
console.log(numberBox, stringBox);
//ep ma de su dung vs kieu du lieu mang ,tao 1 class
class DataStore {
    constructor() {
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
    getAll() {
        return this.items; //hien thi ra
    }
}
//tao doi tuong
const fruitStore = new DataStore(); //ep kieu luon
fruitStore.addItem("banana"); //them ptu
fruitStore.addItem("lemon");
console.log(fruitStore.getAll());
//bai tiep : Generic interface
