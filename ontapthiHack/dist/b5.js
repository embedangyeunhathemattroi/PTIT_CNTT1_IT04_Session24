// =======================
// Lớp Movie - Phim
// =======================
class Movie {
    constructor(id, title, duration) {
        this.id = id;
        this.title = title;
        this.duration = duration;
    }
}
// =======================
// Lớp Showtime - Suất chiếu
// =======================
class Showtime {
    constructor(id, movie, time, availableSeats) {
        this.id = id;
        this.movie = movie;
        this.time = time;
        this.availableSeats = availableSeats;
    }
}
// =======================
// Lớp Cinema - Quản lý rạp
// =======================
class Cinema {
    constructor() {
        this.movies = []; // Danh sách phim
        this.showtimes = []; // Danh sách suất chiếu
    }
    // Thêm phim mới
    addMovie(movie) {
        this.movies.push(movie);
        console.log(`✅ Đã thêm phim: ${movie.title}`);
    }
    // Xóa phim theo id
    removeMovie(movieId) {
        this.movies = this.movies.filter(m => m.id !== movieId);
        console.log(`🗑️ Đã xóa phim có ID: ${movieId}`);
    }
    // Thêm suất chiếu
    addShowtime(showtime) {
        this.showtimes.push(showtime);
        console.log(`🎬 Đã thêm suất chiếu: ${showtime.movie.title} - ${showtime.time}`);
    }
    // Đặt vé
    bookTicket(showtimeId, seats) {
        const st = this.showtimes.find(s => s.id === showtimeId);
        if (!st) {
            console.log("❌ Không tìm thấy suất chiếu!");
            return;
        }
        if (st.availableSeats >= seats) {
            st.availableSeats -= seats;
            console.log(`🎟️ Đặt thành công ${seats} vé cho phim: ${st.movie.title}`);
        }
        else {
            console.log("⚠️ Không đủ ghế trống!");
        }
    }
    // Hiển thị danh sách phim
    showMovies() {
        console.log("\n📽️ DANH SÁCH PHIM:");
        this.movies.forEach(m => {
            console.log(`- [${m.id}] ${m.title} (${m.duration} phút)`);
        });
    }
    // Hiển thị danh sách suất chiếu
    showShowtimes() {
        console.log("\n🕒 DANH SÁCH SUẤT CHIẾU:");
        this.showtimes.forEach(s => {
            console.log(`- [${s.id}] ${s.movie.title} - ${s.time} - Ghế trống: ${s.availableSeats}`);
        });
    }
}
// =======================
// Demo sử dụng hệ thống
// =======================
const cinema = new Cinema();
// Tạo phim
const movie1 = new Movie(1, "Avengers: Endgame", 180);
const movie2 = new Movie(2, "Spider-Man: No Way Home", 150);
// Thêm phim
cinema.addMovie(movie1);
cinema.addMovie(movie2);
cinema.showMovies();
// Thêm suất chiếu
const showtime1 = new Showtime(1, movie1, "2025-08-14 19:00", 50);
const showtime2 = new Showtime(2, movie2, "2025-08-14 21:00", 40);
cinema.addShowtime(showtime1);
cinema.addShowtime(showtime2);
cinema.showShowtimes();
// Đặt vé
cinema.bookTicket(1, 5);
cinema.bookTicket(2, 45); // Không đủ ghế
// Xem lại danh sách suất chiếu
cinema.showShowtimes();
