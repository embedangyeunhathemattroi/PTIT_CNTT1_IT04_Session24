class Book {
    constructor(id, title, author, year) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.year = year;
    }
}
// Ràng buộc kiểu dữ liệu để đảm bảo có id, title, author
class Library {
    constructor() {
        this.books = [];
    }
    // 1. Thêm sách vào thư viện
    addBook(book) {
        this.books.push(book);
        console.log(` Đã thêm sách: ${book.title}`);
    }
    // 2. Tìm sách theo ID
    getBookById(id) {
        return this.books.find(item => item.id === id);
    }
    // 3. Xóa sách khỏi thư viện theo ID
    removeBook(id) {
        const index = this.books.findIndex(item => item.id === id);
        if (index === -1) {
            console.log(" Không có sách trong thư viện với ID này");
        }
        else {
            console.log(` Đã xóa sách: ${this.books[index].title}`);
            this.books.splice(index, 1);
        }
    }
    // 4. Cập nhật thông tin sách theo ID
    updateBook(id, new_book) {
        const index = this.books.findIndex(item => item.id === id);
        if (index === -1) {
            console.log(" Không tìm thấy sách để cập nhật");
        }
        else {
            this.books[index] = new_book;
            console.log(` Đã cập nhật sách ID=${id}`);
        }
    }
    // 5. Lấy danh sách tất cả sách
    listBooks() {
        return this.books;
    }
    // 6. Tìm sách theo tên hoặc tác giả
    findBooksByTitleOrAuthor(searchTerm) {
        const term = searchTerm.toLowerCase();
        return this.books.filter(item => item.title.toLowerCase().includes(term) ||
            item.author.toLowerCase().includes(term));
    }
    // 7. Đếm tổng số sách
    getTotalBooks() {
        return this.books.length;
    }
    // 8. Tìm sách theo năm xuất bản
    findBooksByYear(year) {
        return this.books.filter(item => item.year === year);
    }
}
// Tạo thư viện chứa Book
const myLibrary = new Library();
// Thêm sách
myLibrary.addBook(new Book(1, "Lập Trình TypeScript", "Tran Minh Cuong", 2023));
myLibrary.addBook(new Book(2, "JavaScript Cơ Bản", "Trinh QUoc Hai", 2022));
myLibrary.addBook(new Book(3, "Node.js Nâng Cao", "Phạm Văn C", 2023));
console.log(" Danh sách sách:", myLibrary.listBooks());
console.log(" Tìm ID=1:", myLibrary.getBookById(1));
myLibrary.updateBook(2, new Book(2, "JavaScript Nâng Cao", "Thay Quang", 2024));
myLibrary.removeBook(1);
console.log(" Tìm 'JavaScript':", myLibrary.findBooksByTitleOrAuthor("JavaScript"));
console.log("Tổng số sách:", myLibrary.getTotalBooks());
console.log(" Sách xuất bản năm 2023:", myLibrary.findBooksByYear(2023));
