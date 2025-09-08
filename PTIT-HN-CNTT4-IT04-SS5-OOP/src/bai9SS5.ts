class Book {
    constructor(
        private title: string,
        private author: string,
        private id: string,
        private year: number
    ) {}
//lay gtri
    getTitle(): string { return this.title; }
    getAuthor(): string { return this.author; }
    getId(): string { return this.id; }
    getYear(): number { return this.year; }
//sua gtri
    setTitle(newTitle: string): void { this.title = newTitle; }
    setAuthor(newAuthor: string): void { this.author = newAuthor; }
    setYear(newYear: number): void { this.year = newYear; }
//chuyen doi Book thanh chuoi mo ta de doc hon,hop khi in ra dsach console
    toString(): string {
        return `ID: ${this.id} | ${this.title} - ${this.author} (${this.year})`;
    }
}
//kiem tra thay thi tim thay 
class Library {
    private bookList: Book[] = [];

    // Thêm sách
    addBook(book: Book): void {
        this.bookList.push(book);
    }

    // Hiển thị danh sách sách
    listBooks(title: string): void {
        console.log(`\n===== ${title} =====`);
        if (this.bookList.length === 0) {
            console.log("Thư viện trống");
            return;
        }
        console.log(this.bookList
            .map((book, index) => `${index + 1}. ${book.toString()}`)
            .join("\n")
        );
    }

    // Cập nhật sách
    updateBookById(id: string, newTitle: string, newAuthor: string, newYear: number): void {
        const book = this.bookList.find(book => book.getId() === id);
        if (book) {
            book.setTitle(newTitle);
            book.setAuthor(newAuthor);
            book.setYear(newYear);
            console.log(`\nCập nhật thành công sách ID: ${id}`);
        } else {
            console.log(`\nKhông tìm thấy sách ID: ${id}`);
        }
    }

    // Xóa sách
    deleteBookById(id: string): void {
        const index = this.bookList.findIndex(book => book.getId() === id);
        if (index !== -1) {
            this.bookList.splice(index, 1);
            console.log(`\nĐã xóa sách ID: ${id}`);
        } else {
            console.log(`\nKhông tìm thấy sách ID: ${id}`);
        }
    }

    // Tìm kiếm sách theo tiêu đề
    searchBooksByTitle(keyword: string): void {
        console.log(`\nKết quả tìm kiếm cho từ khóa "${keyword}":`);
        const foundBooks = this.bookList.filter(book =>
            book.getTitle().toLowerCase().includes(keyword.toLowerCase())
        );
        if (foundBooks.length === 0) {
            console.log("Không tìm thấy sách phù hợp");
        } else {
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
