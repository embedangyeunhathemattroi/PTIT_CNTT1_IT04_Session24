const book1 = {
    bookId: 1,
    bookName: " hoa vang "
};
//tu product  ,class A ko interface product , trong clkass A bor qua getInfor , bat buoc ph trien khai ngoai construct
class A {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    getInfo() {
        return ` thong tin san pham : ten _${this.name}, gia _${this.price}`;
        we;
    }
}
//1 class co implement va nhieu interface dc
//neu cos nhieu thi ph trien khai thuoc tnh no
//interface linh hoac hon Abstract
