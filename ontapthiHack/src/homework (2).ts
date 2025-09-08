//B1: Xây dựng các lớp
class Book {
    private title: string;
    private author: string;

    constructor(title: string, author: string) {
        this.title = title
        this.author = author
    }
    getInfo(): string {
        return `${this.title}, ${this.author}`
    }
}

class Library {
    private books: Book[] = [];
    addBook(book: Book): void {
        this.books.push(book);
    }
    showBooks(): void {
        console.log("Danh sách thư viện: ");
        this.books.forEach((book) => {
            console.log(book.getInfo());
        })
    }
    
}
//B2: Khởi tạo 5 đối tượng từ lớp Book
const book1 = new Book("To Kill a Mockingbird", "Harper Lee");
const book2 = new Book("1984", "George Orwell");
const book3 = new Book("The Great Gatsby", "F. Scott Fitzgerald");
const book4 = new Book("Pride and Prejudice", "Jane Austen");
const book5 = new Book("The Hobbit", "J.R.R. Tolkien");
//B3: Thêm 5 sách vào thư viện
const myLib = new Library()
myLib.addBook(book1)
myLib.addBook(book2)
myLib.addBook(book3)
myLib.addBook(book4)
myLib.addBook(book5)
myLib.showBooks()