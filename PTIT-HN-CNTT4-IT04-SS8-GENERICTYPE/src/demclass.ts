function generic<T>(params:T):T{  //T là type
    return params;
}
generic("2");
generic(1);
//1: kieu mang
let numbersss:number[]=[1,2,3,4,5];
let numbers1:Array <number>=[3,5,7,9];
let studentName:Array<string>=["hoa","hong"];

//2: kieu record( mo ta kieu du lieu cua key-value)
const user_infoss:Record<string,string|number>={
    name:"Linh",
    age:20
}

//3: kieu partical
interface Contact{
    email:string;
    phone:string;
}
const partitaUser:Partial<Contact>={
email:"phamngoclinhtq@gmail.com"
}


//4:kieu readonly
interface Score{
    math: number,
    english:number
}
const score1:Readonly <Score> ={
    math:10,
    english:9
}
//score.math=11; //ko dc loi 

//5: pick-lua chon
interface User{
    id:string,
    name:string,
    email:string,
    address:string,
    salary:string
}
let user1:Pick<User,"name"|"address"|"id">={  //cai can chon
    name:",hoa",
    address:"ha noi ",
    id:"11"
}


//6: omit -loai bo key khoi value
let user2:Omit<User,"salary">={
    id:"001",
    name:"hoaa",
    email:"phamhoa@gmail.com"
}
