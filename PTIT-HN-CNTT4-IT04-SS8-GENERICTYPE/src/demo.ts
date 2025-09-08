function echoString(value:string):string {
    return value;
}


function echoNumber(value:number):number {
    return value;
}
console.log(echoNumber(5));
console.log(echoString("hello Rikkei"));
//can viet lai kham , gay mat linh hoat
//generic giup vc do
//T nay tra ve dc nhieu kieu
function echo<T>(value:T):T{
    return value;
}

console.log(echo(true));
console.log(echo("hello ban "));
console.log(echo(3));
let resultGeneric=echo(5); 
//result.toLowerCase();  //giup phat hien loi som va tranh bi trung lap 


//Syntax: function identity<T>(arg:T):T: cu phap trien khai parameter 
//co the sdung any
function echoAny(value:any):any {
    return value;   
}
//let result=echoAny(5); //tu truyen vao doi so
//result.toLowerCase(); //khi chay moi loi, no se la 1 function vi day chi sdung vs du lieu chuoi 

//đối vs kieu dlieu generic

//tiep b2
function identity<T>(value:T):T { //du doan kieu du lieu cho no
    return value;
    
}
//co the them dau <> de ep kieu --lap tinh gtri truyen vao ph dung
const result=identity<number>(3);
console.log(result);

//ham generic nhan vao 2 tham so
function pair<T,U>(first:T,second:U):[T,U] {
    return [first,second];
}

const resultPair=pair<string,number>("PTIT",20);
console.log(resultPair);

function checkElement<T>(arr:T[],conditionFn:(item:T)=>boolean):T|undefined { //ph tmyc, ko dc thi underfined ,tham so dau la du lieu mang, ham KTDK,KT tung item .Tra ve boolean.
    for(const item of arr){ //check tung item mang array
        if(conditionFn(item)) return item;//neu ton tai 
    }
    return undefined;
}
const number=[1,2,3,4,5];
const firstEven=checkElement(number,(item)=>item %2==0);//tim ra ptu dau la so chan ,Pk TMDK 
console.log(firstEven); //ra ptu dau tien la so chan la 2 :TMDk


const fruit=["apple","banana","lemon"];
const startsWith=checkElement(fruit,(item)=>item.startsWith("1"));//thoa man
console.log(startsWith);



//generic class
class NumbrBox {
    value:number;
    constructor(value:number) {
        this.value=value;
    }
}


class StringBox {
    value:string;
    constructor(value:string) {
        this.value=value;
    }
}

//lam vs du lieu ch XD trong generic
class Box<T>{
    value:T;
    constructor(value:T) {
        this.value=value;
    }
}

//di ep kieu
const numberBox=new Box<number>(123);
const stringBox=new Box<string>("mothaiba");
console.log(numberBox,stringBox);


//ep ma de su dung vs kieu du lieu mang ,tao 1 class
class DataStore<T> {
    private items:T[]=[];
    addItem(item:T):void{ //tso dau vao
        this.items.push(item)
    }
    getAll():T[]{
        return this.items;  //hien thi ra
    }
}
//tao doi tuong
const fruitStore=new DataStore<string>()//ep kieu luon
fruitStore.addItem("banana");//them ptu
fruitStore.addItem("lemon");
console.log(fruitStore.getAll());








//bai tiep : Generic interface






