class Book {
    private title: string;
    private author: string;
    private id: string;

    constructor(title: string, author: string, id: string) {
        this.title = title;
        this.author = author;
        this.id = id;
    }

    getTitle(): string {
        return this.title;
    }

    getAuthor(): string {
        return this.author;
    }

    getId(): string {
        return this.id;
    }

    setTitle(newTitle: string): void {
        this.title = newTitle;
    }

    setAuthor(newAuthor: string): void {
        this.author = newAuthor;
    }

    display(): void {
        console.log(`ID: ${this.id}, Title: ${this.title}, Author: ${this.author}`);
    }
}

class Library {
    private books: Book[];

    constructor() {
        this.books = [];
    }

    addBook(book: Book): void {
        this.books.push(book);
    }

    listBook(): void {
        if (this.books.length === 0) {
            console.log("Thư viện này đang trống.");
            return;
        }

        console.log(" Danh sách các quyển sách trong thư viện:");
        this.books.forEach((book, index) => {
            console.log(`${index + 1}. ${book.getAuthor()} - "${book.getTitle()}" (ID: ${book.getId()})`);
        });
    }

    updateBook(id: string, newTitle: string, newAuthor: string): void {
        const foundBook = this.books.find(book => book.getId() === id);
        if (foundBook) {
            foundBook.setTitle(newTitle);
            foundBook.setAuthor(newAuthor);
            console.log(` Đã cập nhật sách có ID: ${id}`);
        } else {
            console.log(`Không tìm thấy sách với ID: ${id}`);
        }
    }

    //  Phương thức tìm kiếm sách theo tên co the sdung for, includes. filter di vs includes
    //forEach de duyet nma ko break dc . Bat dc duyet het.
    searchBooksByTitle(keyword: string): void {
        const foundBooks = this.books.filter(book =>
            book.getTitle().toLowerCase().includes(keyword.toLowerCase())
        );

        if (foundBooks.length === 0) {
            console.log(` Không tìm thấy sách nào có tiêu đề chứa từ khóa: "${keyword}"`);
        } else {
            console.log(` Kết quả tìm kiếm với từ khóa "${keyword}":`);
            foundBooks.forEach(book => book.display());
        }
    }
}

// ======= Tạo đối tượng sách =======
const book1 = new Book("Thế giới động vật", "Abc", "B01");
const book2 = new Book("Thế giới", "Abd", "B02");
const book3 = new Book("Thế giới loài chim", "Abf", "B03");
const book4 = new Book("Thế giới trong mắt em bé", "Abg", "B04");
const book5 = new Book("Thế giới showbiz", "Aic", "B05");

// ======= Tạo thư viện và thêm sách =======
const library = new Library();
library.addBook(book1);
library.addBook(book2);
library.addBook(book3);
library.addBook(book4);
library.addBook(book5);

// ======= In danh sách ban đầu =======
console.log(" Danh sách ban đầu:");
library.listBook();

// ======= Cập nhật thông tin sách có ID "B03" =======
console.log("\n Đang cập nhật sách có ID B03...");
library.updateBook("B03", "Loài chim di cư", "Nguyễn Văn Cánh");

// ======= In lại danh sách sau khi cập nhật =======
console.log("\n Danh sách sau khi cập nhật:");
library.listBook();

// ======= Tìm kiếm theo tên sách =======
console.log(`\n Tìm kiếm sách với từ khóa "chim":`);
library.searchBooksByTitle("chim");
