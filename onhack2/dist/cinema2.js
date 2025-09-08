// ====== QUẢN LÝ RẠP CHIẾU PHIM ======
// Class Customer (Khách hàng)
class Customer {
    constructor(name, email) {
        this.id = Customer.nextId++; // Gán ID và tăng giá trị cho lần sau
        this.name = name;
        this.email = email;
    }
    // Trả về thông tin chi tiết khách hàng
    getDetails() {
        return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}`;
    }
}
Customer.nextId = 1; // Biến static dùng để tự động tăng ID
// Abstract Class Movie (Phim)
class Movie {
    constructor(title, price, seats) {
        this.id = Movie.nextId++;
        this.title = title;
        this.price = price;
        this.seats = seats;
    }
    // Giảm ghế khi bán vé
    sell(seatCount) {
        this.seats -= seatCount;
    }
    // Tăng ghế khi hủy vé
    restock(seatCount) {
        this.seats += seatCount;
    }
}
Movie.nextId = 1; // Tự động tăng ID
// Class ActionMovie (Phim hành động)
class ActionMovie extends Movie {
    constructor(title, price, seats, stuntCount) {
        super(title, price, seats);
        this.stuntCount = stuntCount;
    }
    getMovieInfo() {
        return `Action Movie - ${this.title} | Giá vé: ${this.price} | Ghế trống: ${this.seats} | Số cảnh hành động: ${this.stuntCount}`;
    }
    getCategory() {
        return `Action-${this.stuntCount}canh hanh dong`;
    }
}
// Class ComedyMovie (Phim hài)
class ComedyMovie extends Movie {
    constructor(title, price, seats, comedian) {
        super(title, price, seats);
        this.comedian = comedian;
    }
    getMovieInfo() {
        return `Comedy Movie - ${this.title} | Giá vé: ${this.price} | Ghế trống: ${this.seats} | Diễn viên chính: ${this.comedian}`;
    }
    getCategory() {
        return "Comedy ";
    }
}
// Class Ticket (Vé xem phim)
class Ticket {
    constructor(customer, movie, seatCount) {
        this.ticketId = Ticket.nextId++;
        this.customer = customer;
        this.movie = movie;
        this.seatCount = seatCount;
        this.totalPrice = movie.price * seatCount;
    }
    // Trả về thông tin chi tiết vé
    getDetails() {
        return `Vé ID: ${this.ticketId}, Khách: ${this.customer.name}, Phim: ${this.movie.title}, Số ghế: ${this.seatCount}, Tổng tiền: ${this.totalPrice}`;
    }
}
Ticket.nextId = 1; // Tự động tăng ID
// Class Cinema (Quản lý rạp)
class Cinema {
    constructor(movies, customers, tickets) {
        this.movies = movies;
        this.customers = customers;
        this.tickets = tickets;
    }
    // Thêm khách hàng
    addCustomer(name, email) {
        const customer = new Customer(name, email); //goi tu lop khach hang ra
        this.customers.push(customer);
        alert("Thêm khách hàng thành công!");
    }
    // Thêm phim mới
    addMovie(movie) {
        this.movies.push(movie);
        alert("Thêm phim thành công!");
    }
    // Đặt vé
    bookTicket(customerId, movieId, seatCount) {
        const customer = this.customers.find(c => c.id === customerId);
        if (!customer) {
            alert("Không tìm thấy khách hàng!");
            return null;
        }
        const movie = this.movies.find(m => m.id === movieId); //tim id phim
        if (!movie) {
            alert("Không tìm thấy phim!");
            return null;
        }
        if (movie.seats < seatCount) {
            alert("Không đủ ghế trống!");
            return null;
        }
        movie.sell(seatCount);
        const ticket = new Ticket(customer, movie, seatCount);
        this.tickets.push(ticket);
        alert("Đặt vé thành công!");
        return ticket;
    }
    // Hủy vé
    cancelTicket(ticketId) {
        const index = this.tickets.findIndex(t => t.ticketId === ticketId);
        if (index === -1) {
            alert("Không tìm thấy vé!");
            return;
        }
        const ticket = this.tickets[index];
        ticket.movie.restock(ticket.seatCount);
        this.tickets.splice(index, 1);
        alert("Hủy vé thành công!");
    }
    // Danh sách phim còn ghế
    listAvailableMovies() {
        const available = this.movies.filter(m => m.seats > 0);
        console.log("Phim còn ghế:");
        available.forEach(m => console.log(m.getMovieInfo()));
    }
    // Danh sách vé của khách hàng
    listCustomerTickets(customerId) {
        const customerTickets = this.tickets.filter(t => t.customer.id === customerId);
        console.log(`Vé của khách hàng ID ${customerId}:`);
        customerTickets.forEach(t => console.log(t.getDetails()));
    }
    // Tổng doanh thu
    calculateTotalRevenue() {
        return this.tickets.reduce((sum, t) => sum + t.totalPrice, 0);
    }
    // Đếm phim theo thể loại
    countMoviesByCategory() {
        const counts = this.movies.reduce((acc, m) => {
            const cat = m.getCategory();
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
        }, {});
        console.log("Số lượng phim theo thể loại:", counts);
    }
    // Cập nhật số ghế
    updateMovieSeats(movieId, newSeats) {
        const index = this.movies.findIndex(m => m.id === movieId);
        if (index === -1) {
            alert("Không tìm thấy phim!");
            return;
        }
        this.movies[index].seats = newSeats;
        alert(`Cập nhật số ghế cho phim ${this.movies[index].title}`);
    }
    // Tìm kiếm chung
    findById(id, arr) {
        return arr.find(item => item.id === id);
    }
}
// Menu chương trình
const cinema = new Cinema([], [], []); // Khởi tạo rạp
while (true) {
    const choice = prompt(`
===== MENU QUẢN LÝ RẠP =====
1. Thêm khách hàng
2. Thêm phim mới
3. Đặt vé
4. Hủy vé
5. Hiển thị phim còn ghế
6. Hiển thị vé của khách hàng
7. Tính tổng doanh thu
8. Thống kê phim theo thể loại
9. Cập nhật số ghế phim
10. Tìm kiếm khách hàng hoặc phim theo ID
11. Xem thông tin chi tiết phim
12. Thoát
Chọn: 
    `);
    if (!choice)
        break;
    switch (choice) {
        case "1":
            const name = prompt("Tên khách hàng:");
            const email = prompt("Email:");
            if (name && email)
                cinema.addCustomer(name, email);
            break;
        case "2":
            const type = prompt("Loại phim (1: Hành động, 2: Hài):");
            const title = prompt("Tên phim:");
            const priceStr = prompt("Giá vé:");
            const seatsStr = prompt("Số ghế:");
            if (!title || !priceStr || !seatsStr)
                break;
            const price = parseFloat(priceStr);
            const seats = parseInt(seatsStr);
            if (type === "1") {
                const stuntStr = prompt("Số cảnh hành động:");
                if (!stuntStr)
                    break;
                cinema.addMovie(new ActionMovie(title, price, seats, parseInt(stuntStr)));
            }
            else if (type === "2") {
                const comedian = prompt("Diễn viên chính:");
                if (!comedian)
                    break;
                cinema.addMovie(new ComedyMovie(title, price, seats, comedian));
            }
            break;
        case "3":
            const custIdStr = prompt("Customer ID:");
            const movieIdStr = prompt("Movie ID:");
            const seatCountStr = prompt("Số ghế đặt:");
            if (!custIdStr || !movieIdStr || !seatCountStr)
                break;
            cinema.bookTicket(parseInt(custIdStr), parseInt(movieIdStr), parseInt(seatCountStr));
            break;
        case "4":
            const ticketIdStr = prompt("Ticket ID hủy:");
            if (!ticketIdStr)
                break;
            cinema.cancelTicket(parseInt(ticketIdStr));
            break;
        case "5":
            cinema.listAvailableMovies();
            break;
        case "6":
            const custId2Str = prompt("Customer ID:");
            if (!custId2Str)
                break;
            cinema.listCustomerTickets(parseInt(custId2Str));
            break;
        case "7":
            alert("Tổng doanh thu: " + cinema.calculateTotalRevenue());
            break;
        case "8":
            cinema.countMoviesByCategory();
            break;
        case "9":
            const movieId2Str = prompt("Movie ID:");
            const newSeatsStr = prompt("Số ghế mới:");
            if (!movieId2Str || !newSeatsStr)
                break;
            cinema.updateMovieSeats(parseInt(movieId2Str), parseInt(newSeatsStr));
            break;
        case "10":
            const searchType = prompt("Tìm (1: Customer, 2: Movie):");
            const idStr = prompt("Nhập ID:");
            if (!searchType || !idStr)
                break;
            const id = parseInt(idStr);
            if (searchType === "1") {
                const cust = cinema.findById(id, cinema.customers);
                alert(cust ? cust.getDetails() : "Không tìm thấy khách hàng");
            }
            else if (searchType === "2") {
                const mov = cinema.findById(id, cinema.movies);
                alert(mov ? mov.getMovieInfo() : "Không tìm thấy phim");
            }
            break;
        case "11":
            const movDetStr = prompt("Movie ID xem chi tiết:");
            if (!movDetStr)
                break;
            const movDet = cinema.findById(parseInt(movDetStr), cinema.movies);
            if (movDet)
                alert(movDet.getMovieInfo());
            else
                alert("Không tìm thấy phim");
            break;
        case "12":
            alert("Thoát chương trình");
            break;
        default:
            alert("Lựa chọn không hợp lệ");
    }
}
