// QUẢN LÝ RẠP CHIẾU PHIM
// ===== LỚP CUSTOMER (KHÁCH HÀNG) =====
class Customer {
    constructor(name, email) {
        this.id = Customer.nextId++; // Gán ID tự động
        this.name = name;
        this.email = email;
    }
    // Trả về thông tin khách hàng
    getDetails() {
        return `Customer[ID=${this.id}, Name=${this.name}, Email=${this.email}]`;
    }
}
Customer.nextId = 1; // Biến static để tự tăng ID
// ===== LỚP MOVIE (PHIM) =====
class Movie {
    constructor(title, genre, duration, ticketPrice, availableSeats) {
        this.id = Movie.nextId++;
        this.title = title;
        this.genre = genre;
        this.duration = duration;
        this.ticketPrice = ticketPrice;
        this.availableSeats = availableSeats;
    }
    // Bán vé: giảm số ghế
    sellTickets(quantity) {
        if (this.availableSeats >= quantity) {
            this.availableSeats -= quantity;
        }
        else {
            alert("Không đủ ghế trống!");
        }
    }
    // Mở thêm suất chiếu: tăng ghế
    restockSeats(quantity) {
        this.availableSeats += quantity;
    }
    // Trả về thông tin phim
    getMovieInfo() {
        return `Movie[ID=${this.id}, Title=${this.title}, Genre=${this.genre}, Duration=${this.duration}p, Price=${this.ticketPrice}, Seats=${this.availableSeats}]`;
    }
}
Movie.nextId = 1;
// ===== LỚP TICKET ORDER (ĐƠN ĐẶT VÉ) =====
class TicketOrder {
    constructor(customer, movies) {
        this.orderId = TicketOrder.nextOrderId++;
        this.customer = customer;
        this.movies = movies;
        // Tính tổng tiền bằng reduce
        this.totalAmount = movies.reduce((sum, item) => sum + item.movie.ticketPrice * item.quantity, 0);
    }
    // Trả về thông tin đơn đặt vé
    getDetails() {
        let movieList = this.movies.map(m => `${m.movie.title} x${m.quantity}`).join(", ");
        return `Order[ID=${this.orderId}, Customer=${this.customer.name}, Movies=${movieList}, Total=${this.totalAmount}]`;
    }
}
TicketOrder.nextOrderId = 1;
// ===== LỚP CINEMA (HỆ THỐNG RẠP) =====
class Cinema {
    constructor() {
        this.movies = [];
        this.customers = [];
        this.orders = [];
    }
    // Thêm phim
    addMovie(movie) {
        this.movies.push(movie);
    }
    // Thêm khách hàng
    addCustomer(name, email) {
        this.customers.push(new Customer(name, email));
    }
    // Tạo đơn đặt vé
    createOrder(customerId, movieQuantities) {
        const customer = this.findById(customerId, this.customers);
        if (!customer) {
            alert("Không tìm thấy khách hàng");
            return;
        }
        let movieList = [];
        for (let mq of movieQuantities) {
            const movie = this.findById(mq.movieId, this.movies);
            if (movie && movie.availableSeats >= mq.quantity) {
                movie.sellTickets(mq.quantity);
                movieList.push({ movie, quantity: mq.quantity });
            }
            else {
                alert(`Phim ID=${mq.movieId} không đủ ghế hoặc không tồn tại`);
            }
        }
        if (movieList.length > 0) {
            this.orders.push(new TicketOrder(customer, movieList));
            alert("Đặt vé thành công!");
        }
    }
    // Hủy đơn
    cancelOrder(orderId) {
        const index = this.orders.findIndex(o => o.orderId === orderId);
        if (index !== -1) {
            // Hoàn lại ghế
            this.orders[index].movies.forEach(item => item.movie.restockSeats(item.quantity));
            this.orders.splice(index, 1);
            alert("Đã hủy đơn");
        }
        else {
            alert("Không tìm thấy đơn");
        }
    }
    // Lọc phim còn ghế
    listAvailableMovies() {
        return this.movies.filter(m => m.availableSeats > 0);
    }
    // Lọc đơn của khách
    listCustomerOrders(customerId) {
        return this.orders.filter(o => o.customer.id === customerId);
    }
    // Tính doanh thu
    calculateTotalRevenue() {
        return this.orders.reduce((sum, order) => sum + order.totalAmount, 0);
    }
    // Cập nhật ghế
    updateMovieSeats(movieId, newSeats) {
        const index = this.movies.findIndex(m => m.id === movieId);
        if (index !== -1) {
            this.movies[index].availableSeats = newSeats;
            alert("Đã cập nhật ghế");
        }
        else {
            alert("Không tìm thấy phim");
        }
    }
    // Generic findById
    findById(id, array) {
        return array.find((item) => item.id === id);
    }
}
// ===== CHƯƠNG TRÌNH MENU =====
const cinema = new Cinema();
while (true) {
    const choice = prompt(`===== MENU RẠP CHIẾU PHIM =====
1. Thêm khách hàng
2. Thêm phim
3. Đặt vé
4. Hủy đơn vé
5. Hiển thị phim còn ghế
6. Hiển thị đơn vé của khách
7. Tính doanh thu
8. Cập nhật số ghế
9. Tìm kiếm khách hoặc phim theo ID
10. Xem thông tin chi tiết phim
11. Thoát
Chọn:`);
    if (!choice)
        break;
    switch (choice) {
        case "1":
            cinema.addCustomer(prompt("Tên:"), prompt("Email:"));
            break;
        case "2":
            cinema.addMovie(new Movie(prompt("Tên phim:"), prompt("Thể loại:"), parseInt(prompt("Thời lượng (phút):")), parseFloat(prompt("Giá vé:")), parseInt(prompt("Số ghế:"))));
            break;
        case "3":
            const custId = parseInt(prompt("ID khách hàng:"));
            const movieId = parseInt(prompt("ID phim:"));
            const qty = parseInt(prompt("Số vé:"));
            cinema.createOrder(custId, [{ movieId, quantity: qty }]);
            break;
        case "4":
            cinema.cancelOrder(parseInt(prompt("ID đơn:")));
            break;
        case "5":
            console.log(cinema.listAvailableMovies().map(m => m.getMovieInfo()).join("\n"));
            break;
        case "6":
            console.log(cinema.listCustomerOrders(parseInt(prompt("ID khách:"))).map(o => o.getDetails()).join("\n"));
            break;
        case "7":
            alert("Doanh thu: " + cinema.calculateTotalRevenue());
            break;
        case "8":
            cinema.updateMovieSeats(parseInt(prompt("ID phim:")), parseInt(prompt("Số ghế mới:")));
            break;
        case "9":
            const id = parseInt(prompt("Nhập ID:"));
            const foundCustomer = cinema.findById(id, cinema.customers);
            const foundMovie = cinema.findById(id, cinema.movies);
            if (foundCustomer)
                alert(foundCustomer.getDetails());
            else if (foundMovie)
                alert(foundMovie.getMovieInfo());
            else
                alert("Không tìm thấy");
            break;
        case "10":
            const movieInfo = cinema.findById(parseInt(prompt("ID phim:")), cinema.movies);
            alert(movieInfo ? movieInfo.getMovieInfo() : "Không tìm thấy phim");
            break;
        case "11":
            alert("Thoát chương trình");
            break;
        default:
            alert("Lựa chọn không hợp lệ");
    }
}
