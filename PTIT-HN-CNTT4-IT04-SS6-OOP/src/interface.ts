//interFace nhu ban hop dong cac class ph tuan theo no 
interface Product{ 
    //ph co thuoc tinh
    name: string,
    price: number,
    getInfo():string; //ko trien khai de string
}


//vdu
interface Book{
    bookId:number,
    bookName ?:string,
}//khai bao
const book1:Book={
    bookId:1,
    bookName:" hoa vang "
}

//tu product  ,class A ko interface product , trong clkass A bor qua getInfor , bat buoc ph trien khai ngoai construct
class A implements Product{
    name: string;
    price: number;
    constructor(name: string,price: number){
        this.name=name;
        this.price=price;
    }
    getInfo():string{
        return ` thong tin san pham : ten _${this.name}, gia _${ this.price}` we;
    }
}

//1 class co implement va nhieu interface dc
//neu cos nhieu thi ph trien khai thuoc tnh no
//interface linh hoac hon Abstract
