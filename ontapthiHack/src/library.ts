// =======================
// Class Book - Quản lý thông tin sách
// =======================
class Book {
    public id: number;        // Mã sách
    public title: string;     // Tên sách
    public author: string;    // Tác giả
    public quantity: number;  // Số lượng sách còn trong kho

    constructor(id: number, title: string, author: string, quantity: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.quantity = quantity;
    }
}

// =======================
// Class Member - Quản lý thông tin thành viên
// =======================
class Member {
    public id: number;         
    public name: string;
    public borrowCount: number; // Số lần mượn sách

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.borrowCount = 0;
    }
}

// =======================
// Class Librarian - Thủ thư (đăng nhập, xử lý mượn/trả)
// =======================
class Librarian {
    public id: number;
    public userName: string;
    private password: string;
    public isLogin: boolean;

    constructor(id: number, userName: string, password: string) {
        this.id = id;
        this.userName = userName;
        this.password = password;
        this.isLogin = false;
    }

    // Đăng nhập
    public login(pass: string): void {
        if (this.password === pass) {
            this.isLogin = true;
            console.log(`Thủ thư ${this.userName} đăng nhập thành công!`);
        } else {
            console.log("Sai mật khẩu!");
        }
    }

    // Đăng xuất
    public logout(): void {
        if (this.isLogin) {
            this.isLogin = false;
            console.log("Đã đăng xuất!");
        }
    }
}

// =======================
// Class BorrowRecord - Lưu thông tin mượn/trả
// =======================
class BorrowRecord {
    public memberId: number;
    public bookId: number;
    public borrowDate: Date;
    public returnDate: Date | null;

    constructor(memberId: number, bookId: number) {
        this.memberId = memberId;
        this.bookId = bookId;
        this.borrowDate = new Date();
        this.returnDate = null;
    }
}

// =======================
// Class Library - Quản lý toàn bộ hệ thống
// =======================
class Library {
    private books: Book[] = [];
    private members: Member[] = [];
    private borrowRecords: BorrowRecord[] = [];

    // Thêm sách
    public addBook(book: Book): void {
        this.books.push(book);
        console.log(`Đã thêm sách: ${book.title}`);
    }

    // Thêm thành viên
    public addMember(member: Member): void {
        this.members.push(member);
        console.log(`Đã thêm thành viên: ${member.name}`);
    }

    // Mượn sách
    public borrowBook(memberId: number, bookId: number): void {
        let member = this.members.find(m => m.id === memberId);
        let book = this.books.find(b => b.id === bookId);

        if (!member) {
            console.log("Không tìm thấy thành viên!");
            return;
        }
        if (!book) {
            console.log("Không tìm thấy sách!");
            return;
        }
        if (book.quantity <= 0) {
            console.log("Sách đã hết!");
            return;
        }

        book.quantity -= 1;
        member.borrowCount += 1;
        let record = new BorrowRecord(memberId, bookId);
        this.borrowRecords.push(record);
        console.log(`${member.name} đã mượn sách "${book.title}"`);
    }

    // Trả sách
    public returnBook(memberId: number, bookId: number): void {
        let record = this.borrowRecords.find(r => r.memberId === memberId && r.bookId === bookId && r.returnDate === null);
        if (!record) {
            console.log("Không tìm thấy bản ghi mượn sách này!");
            return;
        }
        record.returnDate = new Date();

        let book = this.books.find(b => b.id === bookId);
        if (book) {
            book.quantity += 1;
        }

        console.log(`Thành viên ${memberId} đã trả sách ${book?.title}`);
    }

    // Thống kê
    public statistics(): void {
        let totalBooks = this.books.reduce((sum, b) => sum + b.quantity, 0);
        let borrowedBooks = this.borrowRecords.filter(r => r.returnDate === null).length;
        console.log(`📊 Sách còn trong kho: ${totalBooks}`);
        console.log(`📊 Sách đang được mượn: ${borrowedBooks}`);
        this.members.forEach(m => {
            console.log(`📊 Thành viên ${m.name} đã mượn ${m.borrowCount} lần`);
        });
    }
}

// =======================
// TEST CHƯƠNG TRÌNH
// =======================

// Tạo thư viện
let library = new Library();

// Thêm sách
library.addBook(new Book(1, "Lập trình Java", "Nguyễn Văn A", 3));
library.addBook(new Book(2, "TypeScript Cơ Bản", "Trần Văn B", 2));

// Thêm thành viên
library.addMember(new Member(101, "Nguyễn Văn C"));
library.addMember(new Member(102, "Lê Thị D"));

// Tạo thủ thư
let librarian = new Librarian(1, "admin", "123");
librarian.login("123");

// Mượn sách
library.borrowBook(101, 1);
library.borrowBook(102, 2);

// Trả sách
library.returnBook(101, 1);

// Thống kê
library.statistics();
