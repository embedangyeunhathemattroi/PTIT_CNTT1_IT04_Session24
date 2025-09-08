// ===========================
// QUẢN LÝ THƯ VIỆN
// ===========================
// ====== Reader (Bạn đọc) ======
class Reader {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.id = Reader.nextId++;
    }
    getDetails() {
        return `Reader[ID=${this.id}, Name=${this.name}, Email=${this.email}]`;
    }
}
Reader.nextId = 1;
// ====== Book (Abstract) ======
class Book {
    constructor(title, author, genre, stock) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.stock = stock;
        this.id = Book.nextId++;
    }
    borrow(quantity) {
        if (this.stock < quantity)
            return false;
        this.stock -= quantity;
        return true;
    }
    restock(quantity) {
        this.stock += quantity;
    }
}
Book.nextId = 1;
// ====== PrintedBook ======
class PrintedBook extends Book {
    constructor(title, author, genre, stock, pages) {
        super(title, author, genre, stock);
        this.pages = pages;
    }
    getBookInfo() {
        return `PrintedBook[ID=${this.id}] ${this.title} - Author:${this.author} - Genre:${this.genre} - Pages:${this.pages} - Stock:${this.stock}`;
    }
    getCategory() { return "PrintedBook"; }
}
// ====== EBook ======
class EBook extends Book {
    constructor(title, author, genre, stock, fileSize) {
        super(title, author, genre, stock);
        this.fileSize = fileSize;
    }
    getBookInfo() {
        return `EBook[ID=${this.id}] ${this.title} - Author:${this.author} - Genre:${this.genre} - FileSize:${this.fileSize}MB - Stock:${this.stock}`;
    }
    getCategory() { return "EBook"; }
}
// ====== BorrowRecord ======
class BorrowRecord {
    constructor(reader, books, borrowDate, returnDate) {
        this.reader = reader;
        this.books = books;
        this.borrowDate = borrowDate;
        this.returnDate = returnDate;
        this.recordId = BorrowRecord.nextRecordId++;
    }
    getDetails() {
        var _a;
        const list = this.books.map(b => `${b.book.title} x${b.quantity}`).join(", ");
        return `BorrowRecord[ID=${this.recordId}] Reader=${this.reader.name}, Books=[${list}], Borrow=${this.borrowDate}, Return=${(_a = this.returnDate) !== null && _a !== void 0 ? _a : "Chưa trả"}`;
    }
}
BorrowRecord.nextRecordId = 1;
// ====== Library ======
class Library {
    constructor() {
        this.books = [];
        this.readers = [];
        this.borrowRecords = [];
    }
    // 1) Thêm bạn đọc
    addReader(name, email) {
        this.readers.push(new Reader(name, email));
        alert("Đã thêm bạn đọc!");
    }
    // 2) Thêm sách
    addPrintedBook(title, author, genre, stock, pages) {
        this.books.push(new PrintedBook(title, author, genre, stock, pages));
        alert("Đã thêm PrintedBook!");
    }
    addEBook(title, author, genre, stock, fileSize) {
        this.books.push(new EBook(title, author, genre, stock, fileSize));
        alert("Đã thêm EBook!");
    }
    // 3) Mượn sách
    borrowBooks(readerId, items, borrowDate) {
        const reader = this.findById(readerId, this.readers);
        if (!reader) {
            alert("Không tìm thấy bạn đọc");
            return;
        }
        const selected = [];
        for (const it of items) {
            const book = this.findById(it.bookId, this.books);
            if (!book) {
                alert(`Không tìm thấy Book ID=${it.bookId}`);
                continue;
            }
            if (!book.borrow(it.quantity)) {
                alert(`Sách ${book.title} không đủ số lượng`);
                continue;
            }
            selected.push({ book, quantity: it.quantity });
        }
        if (selected.length === 0) {
            alert("Không có sách hợp lệ");
            return;
        }
        this.borrowRecords.push(new BorrowRecord(reader, selected, borrowDate));
        alert("Mượn sách thành công!");
    }
    // 4) Trả sách
    returnBooks(recordId, returnDate) {
        const idx = this.borrowRecords.findIndex(r => r.recordId === recordId);
        if (idx === -1) {
            alert("Không tìm thấy record");
            return;
        }
        const record = this.borrowRecords[idx];
        record.books.forEach(b => b.book.restock(b.quantity));
        record.returnDate = returnDate;
        alert("Trả sách thành công và cập nhật tồn kho!");
    }
    // 5) Lọc sách còn trong kho
    listAvailableBooks() {
        return this.books.filter(b => b.stock > 0);
    }
    // 6) Hiển thị sách bạn đọc đã mượn
    listReaderBorrowRecords(readerId) {
        return this.borrowRecords.filter(r => r.reader.id === readerId);
    }
    // 7) Thống kê số lượng sách theo thể loại
    countBooksByGenre() {
        return this.books.reduce((acc, b) => {
            acc[b.genre] = (acc[b.genre] || 0) + b.stock;
            return acc;
        }, {});
    }
    // 8) Cập nhật số lượng sách
    updateBookStock(bookId, newStock) {
        const idx = this.books.findIndex(b => b.id === bookId);
        if (idx === -1) {
            alert("Không tìm thấy sách");
            return;
        }
        this.books[idx].stock = newStock;
        alert("Cập nhật số lượng thành công!");
    }
    // 9) Tìm kiếm bạn đọc hoặc sách
    findById(id, arr) {
        return arr.find((x) => x.id === id);
    }
    // 10) Xem thông tin sách
    getBookInfo(bookId) {
        const b = this.findById(bookId, this.books);
        return b ? b.getBookInfo() : "Không tìm thấy sách";
    }
}
// ====== MENU ======
const library = new Library();
while (true) {
    const choice = prompt(`===== MENU LIBRARY =====
1. Thêm bạn đọc
2. Thêm sách (Printed/EBook)
3. Mượn sách
4. Trả sách
5. Lọc sách còn trong kho
6. Hiển thị sách bạn đọc đã mượn
7. Thống kê số lượng sách theo thể loại
8. Cập nhật số lượng sách
9. Tìm kiếm (Reader/Book)
10. Xem thông tin sách
11. Thoát
Chọn:`);
    if (!choice)
        break;
    switch (choice) {
        case "1": {
            const name = prompt("Tên bạn đọc:");
            const email = prompt("Email:");
            if (!name || !email)
                break;
            library.addReader(name, email);
            break;
        }
        case "2": {
            const t = prompt("Loại sách (1: Printed, 2: EBook):");
            const title = prompt("Tên sách:");
            const author = prompt("Tác giả:");
            const genre = prompt("Thể loại:");
            const stock = parseInt(prompt("Số lượng:"));
            if (t === "1") {
                const pages = parseInt(prompt("Số trang:"));
                library.addPrintedBook(title, author, genre, stock, pages);
            }
            else if (t === "2") {
                const size = parseFloat(prompt("Dung lượng file (MB):"));
                library.addEBook(title, author, genre, stock, size);
            }
            break;
        }
        case "3": {
            const rid = parseInt(prompt("ID bạn đọc:"));
            const n = parseInt(prompt("Số sách muốn mượn:"));
            const items = [];
            for (let i = 0; i < n; i++) {
                const bid = parseInt(prompt(`Book ID #${i + 1}:`));
                const q = parseInt(prompt("Số lượng:"));
                items.push({ bookId: bid, quantity: q });
            }
            const date = prompt("Ngày mượn (yyyy-mm-dd):");
            library.borrowBooks(rid, items, date);
            break;
        }
        case "4": {
            const rid = parseInt(prompt("ID Record:"));
            const date = prompt("Ngày trả (yyyy-mm-dd):");
            library.returnBooks(rid, date);
            break;
        }
        case "5": {
            const list = library.listAvailableBooks().map(b => b.getBookInfo());
            console.log("Sách còn trong kho:\n" + (list.length ? list.join("\n") : "Không có"));
            break;
        }
        case "6": {
            const rid = parseInt(prompt("ID bạn đọc:"));
            const list = library.listReaderBorrowRecords(rid).map(r => r.getDetails());
            console.log("Sách đã mượn:\n" + (list.length ? list.join("\n") : "Không có"));
            break;
        }
        case "7": {
            const stat = library.countBooksByGenre();
            console.log("Thống kê số lượng sách theo thể loại:", stat);
            break;
        }
        case "8": {
            const bid = parseInt(prompt("Book ID:"));
            const ns = parseInt(prompt("Số lượng mới:"));
            library.updateBookStock(bid, ns);
            break;
        }
        case "9": {
            const which = prompt("Tìm (1: Reader, 2: Book):");
            const id = parseInt(prompt("ID:"));
            if (which === "1") {
                const r = library.findById(id, library.readers);
                alert(r ? r.getDetails() : "Không tìm thấy Reader");
            }
            else if (which === "2") {
                const b = library.findById(id, library.books);
                alert(b ? b.getBookInfo() : "Không tìm thấy Book");
            }
            break;
        }
        case "10": {
            const bid = parseInt(prompt("Book ID:"));
            alert(library.getBookInfo(bid));
            break;
        }
        case "11":
            alert("Thoát chương trình");
            throw new Error("Kết thúc");
        default:
            alert("Lựa chọn không hợp lệ");
    }
}
