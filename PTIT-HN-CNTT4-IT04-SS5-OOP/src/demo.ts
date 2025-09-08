//tao lop cha
class Person{
    public name:string;
    private _age:number;
    protected email:string;
    constructor(name:string,_age:number,email:string){
        this.name=name;
        this._age=_age;
        this.email=email;
    }
    get age(){
        return this._age;
    }
  
    set age(newAge:number){
        if (newAge >=0) {
            this._age=newAge;
            
        } else {
            console.log("invalid");
            
            
        }
    }
    showInfo():void{
        console.log(`Name:${this.name},tuoi:${this.age},email:${this.email}`);
        
    }
}
class Student extends Person {
    showEmail() {
        console.log(`Email:${this.email}`);
              
    }
}
const person=new Person("rikkei",3,"rikki.edu.vn");

//public truy cap va chinh sua dc no
console.log("truy cap thuoc tinh cs public",person.name);
person.name="PTIT";
console.log("Thay doi thuoc tinh =>",person.name);

//private- ko the thay doi truc tiep ph thong qua get hay set=truy cap gian tie
//getter-lay gtri thong qua get
console.log("truy cap gtri bien private",person.age);

//setter: thay doi gtri dua tren dkien set ban dau
person.age=-10; //so vs dkien ow tren , vi  pham nen k thay doi dc 
person.age=35; //ra dc kqua
console.log(person.age);
//xong roi ph goi ra
person.showInfo();

const student =new Student(1,22,"linh@gmail.com");
student.showEmail();





