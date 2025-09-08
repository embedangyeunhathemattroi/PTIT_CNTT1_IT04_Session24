class Studentss {
     public fullName:string; //ko dien tu hieu la public vi no truy cap bth ben ngoai
     private age:number;
     protected address:string;  //chi truy cap trong class va class con ke thua class cha
    //ham tao
    constructor(value_fullName:string, value_age:number,address:string) {
        this.fullName=value_fullName;
        this.age=value_age;
        //this.address=value_address;
        this .address=address;
    }
    getInfo():string{
       return `Xin chao ${this.fullName}, ${this.age}tuoi `;
    }
    //cap nhat lai
    setAge(new_age:number){
             this.age=new_age;

    }

}
let SV1=new Studentss("Linh",20,"HN"); //sv1 dc goi 1 instance lop student

// SV1.setAge(22);
//

console.log(SV1.getInfo());


