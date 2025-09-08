// =======================
// Lớp Movie (Phim)
// =======================
class Movie {
    constructor(id, title, duration, genre) {
        this.id = id;
        this.title = title;
        this.duration = duration;
        this.genre = genre;
    }
    // Hiển thị thông tin phim
    displayInfo() {
        console.log(`🎬 [${this.id}] ${this.title} - ${this.genre} - ${this.duration} phút`);
    }
}
// =======================
// Lớp Screening (Suất chiếu)
// =======================
class Screening {
    constructor(id, movie, time, price) {
        this.id = id;
        this.movie = movie;
        this.time = time;
        this.price = price;
    }
    // Hiển thị thông tin suất chiếu
    displayInfo() {
        console.log(`🕒 Suất ${this.id}: ${this.movie.title} | Giờ: ${this.time} | Giá: ${this.price} VNĐ`);
    }
}
// =======================
// Lớp Cinema (Rạp chiếu phim)
// =======================
class Cinema {
    constructor(name) {
        this.name = name;
        this.screenings = [];
    }
    // Thêm suất chiếu
    addScreening(screening) {
        this.screenings.push(screening);
    }
    // Tìm suất chiếu theo tên phim
    findScreeningByMovie(title) {
        return this.screenings.filter(s => s.movie.title.toLowerCase() === title.toLowerCase());
    }
    // Hiển thị toàn bộ suất chiếu
    displayAllScreenings() {
        console.log(`🎥 Danh sách suất chiếu tại rạp ${this.name}:`);
        this.screenings.forEach(s => s.displayInfo());
    }
}
// =======================
// Chương trình mô phỏng
// =======================
// Tạo phim
const movie1 = new Movie(1, "Avengers: Endgame", 181, "Hành động");
const movie2 = new Movie(2, "Frozen 2", 103, "Hoạt hình");
const movie3 = new Movie(3, "Parasite", 132, "Tâm lý");
// Tạo suất chiếu
const screening1 = new Screening(1, movie1, "10:00", 80000);
const screening2 = new Screening(2, movie1, "15:00", 90000);
const screening3 = new Screening(3, movie2, "13:00", 70000);
const screening4 = new Screening(4, movie3, "20:00", 85000);
// Tạo rạp
const cinema = new Cinema("Galaxy Nguyễn Du");
// Thêm suất chiếu vào rạp
cinema.addScreening(screening1);
cinema.addScreening(screening2);
cinema.addScreening(screening3);
cinema.addScreening(screening4);
// Hiển thị toàn bộ suất chiếu
cinema.displayAllScreenings();
// Tìm suất chiếu của một phim cụ thể
console.log("\n🔍 Các suất chiếu của 'Avengers: Endgame':");
const found = cinema.findScreeningByMovie("Avengers: Endgame");
found.forEach(s => s.displayInfo());
