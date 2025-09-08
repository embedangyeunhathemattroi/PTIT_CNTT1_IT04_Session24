class Employee {
    public name:string;
    protected company:string;
    private phone:string;

    constructor(  name:string,company:string,phone:string) {
        this.name=name;
        this.company=company;
        this.phone=phone;
    }

    printInfo():void{
        console.log(`Ten nhan vien: name${this.name}, ten cty:company ${this.company}, so dien thoai :${this.phone}`);
        
    }

}
//Tạo ra một thực thể từ lớp Employee và gọi phương thức printInfo() để in ra các thuộc tính.
const employee=new Employee("Linh Pham Ngoc","rikkei education","346333333");
employee.printInfo();