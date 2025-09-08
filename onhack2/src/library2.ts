// =======================
// Lớp Reader (Bạn đọc)
// =======================
class Reader {
    private static autoId = 1; // ID tự tăng
    public id: number;
    public name: string;
    public email: string;

    constructor(name: string, email: string) {
        this.id = Reader.autoId++;
        this.name = name;
        this.email = email;
    }

    // Lấy thông tin bạn đọc
    getDetails(): string {
        return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}`;
    }
}

// =======================
// Lớp Book (Abstract) - Sách
// =======================
abstract class Book {
    private static autoId = 1; // ID tự tăng
    public id: number;
    public title: string;
    public author: string;
    public genre: string;
    public stock: number;

    constructor(title: string, author: string, genre: string, stock: number) {
        this.id = Book.autoId++;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.stock = stock;
    }

    // Mượn sách
    borrow(quantity: number): boolean {
        if (quantity > this.stock) return false;
        this.stock -= quantity;
        return true;
    }

    // Nhập thêm sách
    restock(quantity: number) {
        this.stock += quantity;
    }

    // Phương thức bắt buộc lớp con định nghĩa
    abstract getBookInfo(): string;
    abstract getCategory(): string;
}

// =======================
// Lớp PrintedBook - Sách in
// =======================
class PrintedBook extends Book {
    public pages: number; // số trang

    constructor(title: string, author: string, genre: string, stock: number, pages: number) {
        super(title, author, genre, stock);
        this.pages = pages;
    }

    getBookInfo(): string {
        return `PrintedBook[ID=${this.id}] ${this.title} - Author: ${this.author}, Genre: ${this.genre}, Pages: ${this.pages}, Stock: ${this.stock}`;
    }

    getCategory(): string { return "PrintedBook"; }
}

// =======================
// Lớp EBook - Sách điện tử
// =======================
class EBook extends Book {
    public fileSize: number; // MB

    constructor(title: string, author: string, genre: string, stock: number, fileSize: number) {
        super(title, author, genre, stock);
        this.fileSize = fileSize;
    }

    getBookInfo(): string {
        return `EBook[ID=${this.id}] ${this.title} - Author: ${this.author}, Genre: ${this.genre}, FileSize: ${this.fileSize}MB, Stock: ${this.stock}`;
    }

    getCategory(): string { return "EBook"; }
}

// =======================
// Lớp BorrowRecord - Phiếu mượn
// =======================
class BorrowRecord {
    private static autoId = 1; 
    public recordId: number;

    constructor(
        public reader: Reader,
        public books: { book: Book, quantity: number }[],
        public borrowDate: string,
        public returnDate?: string
    ) {
        this.recordId = BorrowRecord.autoId++;
    }

    getDetails(): string {
        const list = this.books.map(b => `${b.book.title} x${b.quantity}`).join(", ");
        return `Record ID: ${this.recordId}, Reader: ${this.reader.name}, Books: [${list}], Borrow: ${this.borrowDate}, Return: ${this.returnDate ?? "Chưa trả"}`;
    }
}

// =======================
// Lớp Library - Quản lý thư viện
// =======================
class Library {
    public readers: Reader[] = [];
    public books: Book[] = [];
    public borrowRecords: BorrowRecord[] = [];

    // Thêm bạn đọc
    addReader(name: string, email: string) {
        this.readers.push(new Reader(name, email));
        alert("Đã thêm bạn đọc!");
    }

    // Thêm sách
    addPrintedBook(title: string, author: string, genre: string, stock: number, pages: number) {
        this.books.push(new PrintedBook(title, author, genre, stock, pages));
        alert("Đã thêm PrintedBook!");
    }

    addEBook(title: string, author: string, genre: string, stock: number, fileSize: number) {
        this.books.push(new EBook(title, author, genre, stock, fileSize));
        alert("Đã thêm EBook!");
    }

    // Mượn sách
    borrowBooks(readerId: number, items: { bookId: number, quantity: number }[], borrowDate: string) {
        const reader = this.findById<Reader>(readerId, this.readers);
        if (!reader) { alert("Không tìm thấy bạn đọc"); return; }

        const selected: { book: Book, quantity: number }[] = [];
        for (const it of items) {
            const book = this.findById<Book>(it.bookId, this.books);
            if (!book) { alert(`Không tìm thấy Book ID=${it.bookId}`); continue; }
            if (!book.borrow(it.quantity)) { alert(`Sách ${book.title} không đủ số lượng`); continue; }
            selected.push({ book, quantity: it.quantity });
        }

        if (selected.length === 0) { alert("Không có sách hợp lệ"); return; }

        this.borrowRecords.push(new BorrowRecord(reader, selected, borrowDate));
        alert("Mượn sách thành công!");
    }

    // Trả sách
    returnBooks(recordId: number, returnDate: string) {
        const idx = this.borrowRecords.findIndex(r => r.recordId === recordId);
        if (idx === -1) { alert("Không tìm thấy record"); return; }
        const record = this.borrowRecords[idx];
        record.books.forEach(b => b.book.restock(b.quantity));
        record.returnDate = returnDate;
        alert("Trả sách thành công và cập nhật tồn kho!");
    }

    // Danh sách sách còn trong kho
    listAvailableBooks(): Book[] {
        return this.books.filter(b => b.stock > 0);
    }

    // Danh sách phiếu mượn của một bạn đọc
    listReaderBorrowRecords(readerId: number): BorrowRecord[] {
        return this.borrowRecords.filter(r => r.reader.id === readerId);
    }

    // Thống kê sách theo thể loại
    countBooksByGenre(): Record<string, number> {
        return this.books.reduce((acc: Record<string, number>, b) => {
            acc[b.genre] = (acc[b.genre] || 0) + b.stock;
            return acc;
        }, {});
    }

    // Cập nhật tồn kho
    updateBookStock(bookId: number, newStock: number) {
        const book = this.findById<Book>(bookId, this.books);
        if (!book) { alert("Không tìm thấy sách"); return; }
        book.stock = newStock;
        alert("Cập nhật số lượng thành công!");
    }

    // Tìm kiếm theo ID
    findById<T extends { id: number }>(id: number, arr: T[]): T | undefined {
        return arr.find(x => x.id === id);
    }

    // Xem thông tin sách
    getBookInfo(bookId: number): string {
        const book = this.findById<Book>(bookId, this.books);
        return book ? book.getBookInfo() : "Không tìm thấy sách";
    }
}

// =======================
// MENU tương tác
// =======================
const library = new Library();

function mainMenu() {
    while (true) {
        const choice = prompt(
`===== MENU LIBRARY =====
1. Thêm bạn đọc
2. Thêm sách
3. Mượn sách
4. Trả sách
5. Sách còn trong kho
6. Sách bạn đọc đã mượn
7. Thống kê số lượng sách theo thể loại
8. Cập nhật số lượng sách
9. Tìm kiếm sách theo ID
10. Xem thông tin sách
11. Thoát
Chọn:`
        );

        if (!choice) break;

        switch (choice) {
            case "1": {
                const name = prompt("Tên bạn đọc:")!;
                const email = prompt("Email:")!;
                if (!name || !email) break;
                library.addReader(name, email);
                break;
            }
            case "2": {
                const t = prompt("Loại sách (1: Printed, 2: EBook):")!;
                const title = prompt("Tên sách:")!;
                const author = prompt("Tác giả:")!;
                const genre = prompt("Thể loại:")!;
                const stock = parseInt(prompt("Số lượng:")!);
                if (t === "1") {
                    const pages = parseInt(prompt("Số trang:")!);
                    library.addPrintedBook(title, author, genre, stock, pages);
                } else if (t === "2") {
                    const size = parseFloat(prompt("Dung lượng file (MB):")!);
                    library.addEBook(title, author, genre, stock, size);
                }
                break;
            }
            case "3": {
                const rid = parseInt(prompt("ID bạn đọc:")!);
                const n = parseInt(prompt("Số sách muốn mượn:")!);
                const items: { bookId: number, quantity: number }[] = [];
                for (let i = 0; i < n; i++) {
                    const bid = parseInt(prompt(`Book ID #${i + 1}:`)!);
                    const q = parseInt(prompt("Số lượng:")!);
                    items.push({ bookId: bid, quantity: q });
                }
                const date = prompt("Ngày mượn (yyyy-mm-dd):")!;
                library.borrowBooks(rid, items, date);
                break;
            }
            case "4": {
                const rid = parseInt(prompt("ID Record:")!);
                const date = prompt("Ngày trả (yyyy-mm-dd):")!;
                library.returnBooks(rid, date);
                break;
            }
            case "5": {
                const list = library.listAvailableBooks().map(b => b.getBookInfo());
                console.log("Sách còn trong kho:\n" + (list.length ? list.join("\n") : "Không có"));
                break;
            }
            case "6": {
                const rid = parseInt(prompt("ID bạn đọc:")!);
                const list = library.listReaderBorrowRecords(rid).map(r => r.getDetails());
                console.log("Sách đã mượn:\n" + (list.length ? list.join("\n") : "Không có"));
                break;
            }
            case "7": {
                console.log(library.countBooksByGenre());
                break;
            }
            case "8": {
                const bid = parseInt(prompt("Book ID:")!);
                const ns = parseInt(prompt("Số lượng mới:")!);
                library.updateBookStock(bid, ns);
                break;
            }
            case "9": {
                const bid = parseInt(prompt("Book ID:")!);
                alert(library.getBookInfo(bid));
                break;
            }
            case "10": {
                const bid = parseInt(prompt("Book ID:")!);
                alert(library.getBookInfo(bid));
                break;
            }
            case "11":
                alert("Thoát chương trình");
                return;
            default:
                alert("Lựa chọn không hợp lệ");
        }
    }
}

mainMenu();
