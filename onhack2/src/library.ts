
// Class Book - Quản lý thông tin sách
class Book {
    public id: number;        
    public title: string;     
    public author: string;    
    public quantity: number;  

    constructor(id: number, title: string, author: string, quantity: number) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.quantity = quantity;
    }
}

// Class Member - Quản lý thành viên
class Member {
    public id: number;         
    public name: string;
    public borrowCount: number; 

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.borrowCount = 0;
    }
}

// Class Librarian - Thủ thư
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

    public login(pass: string): void {
        if (this.password === pass) {
            this.isLogin = true;
            console.log(`Thủ thư ${this.userName} đăng nhập thành công!`);
        } else {
            console.log("Sai mật khẩu!");
        }
    }

    public logout(): void {
        if (this.isLogin) {
            this.isLogin = false;
            console.log("Đã đăng xuất!");
        }
    }
}

// Class BorrowRecord - Lưu thông tin mượn/trả
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

// Class Library - Quản lý hệ thống
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

        if (!member) { console.log("Không tìm thấy thành viên!"); return; }
        if (!book) { console.log("Không tìm thấy sách!"); return; }
        if (book.quantity <= 0) { console.log("Sách đã hết!"); return; }

        book.quantity -= 1;
        member.borrowCount += 1;
        this.borrowRecords.push(new BorrowRecord(memberId, bookId));
        console.log(`${member.name} đã mượn sách "${book.title}"`);
    }

    // Trả sách
    public returnBook(memberId: number, bookId: number): void {
        let record = this.borrowRecords.find(r => r.memberId === memberId && r.bookId === bookId && r.returnDate === null);
        if (!record) { console.log("Không tìm thấy bản ghi mượn sách này!"); return; }
        record.returnDate = new Date();

        let book = this.books.find(b => b.id === bookId);
        if (book) book.quantity += 1;

        let member = this.members.find(m => m.id === memberId);
        console.log(`Thành viên ${member?.name} đã trả sách ${book?.title}`);
    }

    // Thống kê
    public statistics(): void {
        let totalBooks = this.books.reduce((sum, b) => sum + b.quantity, 0);
        let borrowedBooks = this.borrowRecords.filter(r => r.returnDate === null).length;
        console.log(` Sách còn trong kho: ${totalBooks}`);
        console.log(` Sách đang được mượn: ${borrowedBooks}`);
        this.members.forEach(m => console.log(` Thành viên ${m.name} đã mượn ${m.borrowCount} lần`));
    }

    // Cập nhật số lượng sách
    public updateBookQuantity(bookId: number, newQty: number): void {
        let book = this.books.find(b => b.id === bookId);
        if (!book) { console.log("Không tìm thấy sách!"); return; }
        book.quantity = newQty;
        console.log(`Cập nhật số lượng sách ${book.title} thành ${newQty}`);
    }

    // Tìm sách theo ID
    public findBook(bookId: number): Book | undefined {
        return this.books.find(b => b.id === bookId);
    }

    // Tìm thành viên theo ID
    public findMember(memberId: number): Member | undefined {
        return this.members.find(m => m.id === memberId);
    }

    // Xóa sách
    public deleteBook(bookId: number): void {
        const index = this.books.findIndex(b => b.id === bookId);
        if (index === -1) { console.log("Không tìm thấy sách!"); return; }
        console.log(`Đã xóa sách: ${this.books[index].title}`);
        this.books.splice(index, 1);
    }

    // Xóa thành viên
    public deleteMember(memberId: number): void {
        const index = this.members.findIndex(m => m.id === memberId);
        if (index === -1) { console.log("Không tìm thấy thành viên!"); return; }
        console.log(`Đã xóa thành viên: ${this.members[index].name}`);
        this.members.splice(index, 1);
    }

    // Xem tất cả sách
    public listBooks(): void {
        console.log("Danh sách sách:");
        this.books.forEach(b => console.log(`ID:${b.id} - ${b.title} - ${b.author} - Số lượng:${b.quantity}`));
    }

    // Xem tất cả thành viên
    public listMembers(): void {
        console.log(" Danh sách thành viên:");
        this.members.forEach(m => console.log(`ID:${m.id} - ${m.name} - Đã mượn:${m.borrowCount}`));
    }
}

// CHẠY MENU 12 CHỨC NĂNG
const library = new Library();
const librarian = new Librarian(1, "admin", "123");

const pass = prompt("Nhập mật khẩu thủ thư:");
librarian.login(pass!);
if (!librarian.isLogin) throw new Error("Đăng nhập thất bại");

while (true) {
    const choice = prompt(
`===== MENU LIBRARY =====
1. Thêm sách
2. Thêm thành viên
3. Mượn sách
4. Trả sách
5. Xem tất cả sách
6. Xem tất cả thành viên
7. Thống kê sách và thành viên
8. Cập nhật số lượng sách
9. Tìm sách theo ID
10. Tìm thành viên theo ID
11. Xóa sách
12. Xóa thành viên
0. Thoát
Chọn:`)!;

    switch(choice) {
        case "1": {
            const id = parseInt(prompt("ID sách:")!);
            const title = prompt("Tên sách:")!;
            const author = prompt("Tác giả:")!;
            const qty = parseInt(prompt("Số lượng:")!);
            library.addBook(new Book(id, title, author, qty));
            break;
        }
        case "2": {
            const id = parseInt(prompt("ID thành viên:")!);
            const name = prompt("Tên thành viên:")!;
            library.addMember(new Member(id, name));
            break;
        }
        case "3": {
            const mid = parseInt(prompt("ID thành viên:")!);
            const bid = parseInt(prompt("ID sách:")!);
            library.borrowBook(mid, bid);
            break;
        }
        case "4": {
            const mid = parseInt(prompt("ID thành viên:")!);
            const bid = parseInt(prompt("ID sách:")!);
            library.returnBook(mid, bid);
            break;
        }
        case "5": library.listBooks(); break;
        case "6": library.listMembers(); break;
        case "7": library.statistics(); break;
        case "8": {
            const bid = parseInt(prompt("ID sách:")!);
            const qty = parseInt(prompt("Số lượng mới:")!);
            library.updateBookQuantity(bid, qty);
            break;
        }
        case "9": {
            const bid = parseInt(prompt("ID sách:")!);
            const book = library.findBook(bid);
            console.log(book?`${book.title} - ${book.author} - Số lượng: ${book.quantity}`:"Không tìm thấy sách");
            break;
        }
        case "10": {
            const mid = parseInt(prompt("ID thành viên:")!);
            const member = library.findMember(mid);
            console.log(member?`${member.name} - Đã mượn: ${member.borrowCount}`:"Không tìm thấy thành viên");
            break;
        }
        case "11": {
            const bid = parseInt(prompt("ID sách:")!);
            library.deleteBook(bid);
            break;
        }
        case "12": {
            const mid = parseInt(prompt("ID thành viên:")!);
            library.deleteMember(mid);
            break;
        }
        case "0": 
            librarian.logout();
            throw new Error("Thoát chương trình");
        default: 
            console.log("Lựa chọn không hợp lệ");
    }
}
