// ===== Lớp Book =====
class Book {
    id: number;
    title: string;
    author: string;
    stock: number;     
    status: string;    // Tình trạng sách

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
    status: string;        // Tình trạng thành viên

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
        console.log(` Đã thêm sách: ${book.title}`);
    }

    // Hiển thị tất cả sách
    showBooks(): void {
        console.log(" Danh sách sách trong thư viện:");
        if (this.books.length === 0) {
            console.log("Không có sách nào trong thư viện.");
        } else {
            this.books.forEach(book => {
                console.log(`ID: ${book.id}, Title: ${book.title}, Author: ${book.author}, Stock: ${book.stock}, Status: ${book.status}`);
            });
        }
    }

    // Đăng ký thành viên mới
    registerMember(id: number, name: string, contact: string): void {
        const newMember = new Member(id, name, contact, "active");
        this.members.push(newMember);
        console.log(`🆕 Thành viên "${name}" đã được đăng ký thành công.`);
    }

    // Khóa hoặc mở khóa thành viên
    blockMember(id: number, status: string): void {
        const member = this.members.find(m => m.id === id);
        if (member) {
            member.status = status;
            console.log(` Thành viên "${member.name}" đã được đổi trạng thái thành: ${status}`);
        } else {
            console.log(`Không tìm thấy thành viên có ID: ${id}`);
        }
    }

    // Hiển thị danh sách thành viên
    showMembers(): void {
        console.log(" Danh sách thành viên:");
        if (this.members.length === 0) {
            console.log("Chưa có thành viên nào.");
        } else {
            this.members.forEach(m => {
                console.log(`ID: ${m.id}, Tên: ${m.name}, Liên hệ: ${m.contact}, Trạng thái: ${m.status}`);
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

// Đăng ký thành viên
myLibrary.registerMember(101, "Nguyễn Văn An", "0123456789");
myLibrary.registerMember(102, "Trần Thị Bình", "0987654321");
myLibrary.registerMember(103, "Lê Văn Cường", "0111222333");


myLibrary.showMembers();


myLibrary.blockMember(102, "blocked");


myLibrary.blockMember(102, "active");

myLibrary.showMembers();
