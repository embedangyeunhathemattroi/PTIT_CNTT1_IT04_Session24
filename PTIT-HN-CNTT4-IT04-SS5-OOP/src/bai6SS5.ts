class Book {
    private title:string;
    private author:string;
    constructor(title:string,author:string) {
        this.title=title;
        this.author=author;
        
    }
    getTitle():string{
        return this.title;
    }

      getAuthor():string{
        return this.author;
    }
}

//tao xong lop book den lop library
class Library {
    private books:Book[]; //vi de bai ghi la mang sach trong thu vien

    constructor(){
        this.books=[]; //vi la mang
        
    }
    //phuong thuc them sach vao 
    addBook(book:Book):void{
        this.books.push(book);
    }
    // xem danh sách các quyển sách trong thư viện.
    listBook():void{
        if (this.books.length===0) {
            console.log("thu vien nay dang torng");
            
            return;
        }
        console.log("danh sach cac quyen sach trong thu vien :");
        //goi this .boook ra trc r sdung forEach
        this.books.forEach((book,index)=>{
            console.log(`${index+1},"${book.getAuthor()},"${book.getTitle()}`);
            
        });
        
    }
}
//khoi tao 5 doi tuong tu lop Book
const book1=new Book("The gioi dong vat","Abc");
const book2=new Book("The gioi ","Abd");
const book3=new Book("The gioi loai chim","Abf");
const book4=new Book("The gioi trong mat em be","Abg");
const book5=new Book("The gioi showbiz","Aic");

//khoi tao doi tuong tu lop 
const library=new Library();

//them 5 quyen vao thu vien
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);
library.addBook(book4);
library.addBook(book5);

//xem danh sach cac quyen trong thu vien
library.listBook();



