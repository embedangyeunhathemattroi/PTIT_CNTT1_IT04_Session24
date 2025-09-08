"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Book {
    title;
    author;
    id;
    year;
    constructor(title, author, id, year) {
        this.title = title;
        this.author = author;
        this.id = id;
        this.year = year;
    }
    //lay gtri
    getTitle() { return this.title; }
    getAuthor() { return this.author; }
    getId() { return this.id; }
    getYear() { return this.year; }
    //sua gtri
    setTitle(newTitle) { this.title = newTitle; }
    setAuthor(newAuthor) { this.author = newAuthor; }
    setYear(newYear) { this.year = newYear; }
    //chuyen doi Book thanh chuoi mo ta de doc hon,hop khi in ra dsach console
    toString() {
        return `ID: ${this.id} | ${this.title} - ${this.author} (${this.year})`;
    }
}
//kiem tra thay thi tim thay 
class Library {
    bookList = [];
    // Thêm sách
    addBook(book) {
        this.bookList.push(book);
    }
    // Hiển thị danh sách sách
    listBooks(title) {
        console.log(`\n===== ${title} =====`);
        if (this.bookList.length === 0) {
            console.log("Thư viện trống");
            return;
        }
        console.log(this.bookList
            .map((book, index) => `${index + 1}. ${book.toString()}`)
            .join("\n"));
    }
    // Cập nhật sách
    updateBookById(id, newTitle, newAuthor, newYear) {
        const book = this.bookList.find(book => book.getId() === id);
        if (book) {
            book.setTitle(newTitle);
            book.setAuthor(newAuthor);
            book.setYear(newYear);
            console.log(`\nCập nhật thành công sách ID: ${id}`);
        }
        else {
            console.log(`\nKhông tìm thấy sách ID: ${id}`);
        }
    }
    // Xóa sách
    deleteBookById(id) {
        const index = this.bookList.findIndex(book => book.getId() === id);
        if (index !== -1) {
            this.bookList.splice(index, 1);
            console.log(`\nĐã xóa sách ID: ${id}`);
        }
        else {
            console.log(`\nKhông tìm thấy sách ID: ${id}`);
        }
    }
    // Tìm kiếm sách theo tiêu đề
    searchBooksByTitle(keyword) {
        console.log(`\nKết quả tìm kiếm cho từ khóa "${keyword}":`);
        const foundBooks = this.bookList.filter(book => book.getTitle().toLowerCase().includes(keyword.toLowerCase()));
        if (foundBooks.length === 0) {
            console.log("Không tìm thấy sách phù hợp");
        }
        else {
            console.log(foundBooks.map(book => book.toString()).join("\n"));
        }
    }
}
// ===== DEMO CHƯƠNG TRÌNH =====
const library = new Library();
library.addBook(new Book("Thế giới động vật", "Abc", "B01", 2020));
library.addBook(new Book("Thế giới", "Abd", "B02", 2019));
library.addBook(new Book("Thế giới loài chim", "Abf", "B03", 2018));
library.addBook(new Book("Thế giới trong mắt em bé", "Abg", "B04", 2021));
library.addBook(new Book("Thế giới showbiz", "Aic", "B05", 2017));
library.listBooks("Danh sách ban đầu");
library.updateBookById("B03", "Loài chim di cư", "Nguyễn Văn Cánh", 2022);
library.deleteBookById("B02");
library.listBooks("Danh sách sau khi cập nhật và xóa");
library.searchBooksByTitle("chim");
//# sourceMappingURL=bai9SS5.js.map