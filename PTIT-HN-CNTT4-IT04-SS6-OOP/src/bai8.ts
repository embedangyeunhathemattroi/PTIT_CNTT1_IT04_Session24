// ===== Lớp Book =====
class Book {
    id: number;
    title: string;
    author: string;
    stock: number;     
    status: string;   

    constructor(id: number, title: string, author: string, stock: number, status: string) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.stock = stock;
        this.status = status;
    }
}

// ===== Lớp Member =====
class Member {
    id: number;
    name: string;
    contact: string;
    lendedBooks: number[];
    status: string;      

    constructor(id: number, name: string, contact: string, status: string) {
        this.id = id;
        this.name = name;
        this.contact = contact;
        this.lendedBooks = [];
        this.status = status;
    }
}

// ===== Lớp LendedBook =====
class LendedBook {
    memberId: number;
    bookId: number;
    dueDate: string; // Ngày phải trả sách

    constructor(memberId: number, bookId: number, dueDate: string) {
        this.memberId = memberId;
        this.bookId = bookId;
        this.dueDate = dueDate;
    }
}

// ===== Lớp Library =====
class Library {
    books: Book[];
    members: Member[];

    constructor() {
        this.books = [];
        this.members = [];
    }

    // Thêm sách vào thư viện
    addBook(book: Book): void {
        this.books.push(book);
        console.log(`Đã thêm sách: ${book.title}`);
    }

    // Hiển thị tất cả sách
    showBooks(): void {
        console.log("📚 Danh sách sách trong thư viện:");
        if (this.books.length === 0) {
            console.log("Không có sách nào trong thư viện.");
        } else {
            this.books.forEach(book => {
                console.log(`ID: ${book.id}, Title: ${book.title}, Author: ${book.author}, Stock: ${book.stock}, Status: ${book.status}`);
            });
        }
    }
}


// Tạo thư viện
const myLibrary = new Library();

// Tạo sách
const book1 = new Book(1, "Lập trình JavaScript", "Nguyễn Văn A", 5, "available");
const book2 = new Book(2, "TypeScript cơ bản", "Trần Thị B", 3, "available");
const book3 = new Book(3, "Node.js nâng cao", "Lê Văn C", 2, "available");

// Thêm sách vào thư viện
myLibrary.addBook(book1);
myLibrary.addBook(book2);
myLibrary.addBook(book3);

// Xem danh sách sách
myLibrary.showBooks();
