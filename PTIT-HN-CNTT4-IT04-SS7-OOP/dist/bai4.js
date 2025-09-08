class Person {
    constructor(name) {
        this.name = name;
    }
}
class Student extends Person {
    constructor(id, name) {
        super(name);
        this.id = id;
    }
    displayInfo() {
        console.log(`Student name:${this.name},Id:${this.id}`);
    }
}
class Teacher extends Person {
    constructor(id, name, subject) {
        super(subject);
        this.subject = subject;
    }
    displayInfo() {
        console.log(`Subject:${this.subject}, teacher name:${this.name}`);
    }
}
//khoi tao doi tuong
const stu1 = new Student(1, "linh");
stu1.displayInfo();
const teacher1 = new Teacher(1, "linh huong", "toan");
teacher1.displayInfo();
const stu2 = new Student(2, "lan");
stu2.displayInfo();
const teacher2 = new Teacher(2, "Thu", "ly");
teacher2.displayInfo();
