class Book {
    constructor(title, author, id) {
        this.title = title;
        this.author = author;
        this.id = id;
    }
    getTitle() {
        return this.title;
    }
    getAuthor() {
        return this.author;
    }
    getId() {
        return this.id;
    }
    setTitle(newTitle) {
        this.title = newTitle;
    }
    setAuthor(newAuthor) {
        this.author = newAuthor;
    }
    display() {
        console.log(`ID: ${this.id}, Title: ${this.title}, Author: ${this.author}`);
    }
}
class Library {
    constructor() {
        this.books = [];
    }
    addBook(book) {
        this.books.push(book);
    }
    listBook() {
        if (this.books.length === 0) {
            console.log("Thư viện này đang trống.");
            return;
        }
        console.log(" Danh sách các quyển sách trong thư viện:");
        this.books.forEach((book, index) => {
            console.log(`${index + 1}. ${book.getAuthor()} - "${book.getTitle()}" (ID: ${book.getId()})`);
        });
    }
    //tu duy , sua.Xem id do da sua gi hay chua. Sau do neu trung thi thoi, cho nhap sua
    updateBook(id, newTitle, newAuthor) {
        const foundBook = this.books.find(book => book.getId() === id);
        if (foundBook) {
            foundBook.setTitle(newTitle);
            foundBook.setAuthor(newAuthor);
            console.log(` Đã cập nhật sách có ID: ${id}`);
        }
        else {
            console.log(` Không tìm thấy sách với ID: ${id}`);
        }
    }
}
const book1 = new Book("Thế giới động vật", "Abc", "B01");
const book2 = new Book("Thế giới", "Abd", "B02");
const book3 = new Book("Thế giới loài chim", "Abf", "B03");
const book4 = new Book("Thế giới trong mắt em bé", "Abg", "B04");
const book5 = new Book("Thế giới showbiz", "Aic", "B05");
const library = new Library();
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);
library.addBook(book4);
library.addBook(book5);
console.log(" Danh sách ban đầu:");
library.listBook();
console.log("\n Đang cập nhật sách có ID B03...");
library.updateBook("B03", "Loài chim di cư", "Nguyễn Văn Cánh");
console.log("\n Danh sách sau khi cập nhật:");
library.listBook();
console.log(" \n da cap nhat danh sach sau khi cap nhat ");
//nhap id can sua , tim sach can byid, sua thong tin bang cach nhap lai , hien thi lai dnah sach
