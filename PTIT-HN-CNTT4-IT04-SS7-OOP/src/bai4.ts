 abstract class Person{
    public name:string;
  constructor( name:string){
    this.name=name;
  }
  //phuong thuc in ra thong tin
  //phuong thuc abstract: lop con bat buoc ph trien khai
  public  abstract displayInfo():void;
}

 class Student extends Person {
    private id:number;
    constructor(id:number,name:string){
        super(name);
        this.id=id;
    }

    public displayInfo(): void {
        console.log(`Student name:${this.name},Id:${this.id}`);
        
    }
 }

 class Teacher extends Person{
    private subject:string;
    constructor(id:number,name:string,subject:string){
        super(subject);
        this.subject=subject;
    }
    public displayInfo(): void {
        console.log(`Subject:${this.subject}, teacher name:${this.name}`);
        
    }
 }

 //khoi tao doi tuong
 const stu1=new Student(1,"linh");
 stu1.displayInfo();
  const teacher1=new Teacher(1,"linh huong","toan");
teacher1.displayInfo();
const stu2=new Student(2,"lan");
stu2.displayInfo();
const teacher2=new Teacher(2,"Thu","ly");
teacher2.displayInfo();
 