// HỆ THỐNG QUẢN LÝ KHÁCH SẠN
// -------------------- LỚP CUSTOMER --------------------
class Customer {
    constructor(name, email, phone) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.id = Customer.idCounter++;
    }
    getDetails() {
        return `ID: ${this.id} | Tên: ${this.name} | Email: ${this.email} | SĐT: ${this.phone}`;
    }
}
Customer.idCounter = 1;
// -------------------- LỚP ROOM (ABSTRACT) --------------------
class Room {
    constructor(name, pricePerNight, isAvailable = true) {
        this.name = name;
        this.pricePerNight = pricePerNight;
        this.isAvailable = isAvailable;
        this.id = Room.idCounter++;
    }
    bookRoom() { this.isAvailable = false; }
    freeRoom() { this.isAvailable = true; }
}
Room.idCounter = 1;
// -------------------- STANDARD ROOM --------------------
class StandardRoom extends Room {
    constructor(name, pricePerNight, numberOfBeds) {
        super(name, pricePerNight);
        this.numberOfBeds = numberOfBeds;
    }
    getRoomInfo() {
        return `${this.name} - ${this.numberOfBeds} giường - ${this.pricePerNight} VND/đêm - ${this.isAvailable ? "Trống" : "Đã đặt"}`;
    }
    getCategory() { return "Standard"; }
}
// -------------------- VIP ROOM --------------------
class VIPRoom extends Room {
    constructor(name, pricePerNight, services) {
        super(name, pricePerNight);
        this.services = services;
    }
    getRoomInfo() {
        return `${this.name} - VIP - Dịch vụ: ${this.services.join(", ")} - ${this.pricePerNight} VND/đêm - ${this.isAvailable ? "Trống" : "Đã đặt"}`;
    }
    getCategory() { return "VIP"; }
}
// -------------------- BOOKING --------------------
class Booking {
    constructor(customer, room, checkInDate, checkOutDate) {
        this.customer = customer;
        this.room = room;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.bookingId = Booking.idCounter++;
        const days = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24));
        this.totalPrice = days * room.pricePerNight;
    }
    getDetails() {
        return `BookingID: ${this.bookingId} | Khách: ${this.customer.name} | Phòng: ${this.room.name} | Tổng tiền: ${this.totalPrice} VND`;
    }
}
Booking.idCounter = 1;
// -------------------- HOTEL --------------------
class Hotel {
    constructor() {
        this.rooms = [];
        this.customers = [];
        this.bookings = [];
    }
    addRoom(room) { this.rooms.push(room); }
    addCustomer(name, email, phone) { this.customers.push(new Customer(name, email, phone)); }
    createBooking(customerId, roomId, checkIn, checkOut) {
        const customer = this.customers.find(c => c.id === customerId);
        const room = this.rooms.find(r => r.id === roomId && r.isAvailable);
        if (!customer || !room) {
            console.log("Không tìm thấy khách hoặc phòng trống!");
            return null;
        }
        const booking = new Booking(customer, room, checkIn, checkOut);
        room.bookRoom();
        this.bookings.push(booking);
        return booking;
    }
    cancelBooking(bookingId) {
        const index = this.bookings.findIndex(b => b.bookingId === bookingId);
        if (index !== -1) {
            this.bookings[index].room.freeRoom();
            this.bookings.splice(index, 1);
            console.log(" Hủy booking thành công!");
        }
        else
            console.log("Không tìm thấy booking!");
    }
    listAvailableRooms() { return this.rooms.filter(r => r.isAvailable); }
    listCustomerBookings(customerId) { return this.bookings.filter(b => b.customer.id === customerId); }
    calculateTotalRevenue() { return this.bookings.reduce((sum, b) => sum + b.totalPrice, 0); }
    countRoomsByCategory() {
        return this.rooms.reduce((acc, room) => {
            const cat = room.getCategory();
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
        }, {});
    }
    updateRoomAvailability(roomId, isAvailable) {
        const room = this.rooms.find(r => r.id === roomId);
        if (room)
            room.isAvailable = isAvailable;
    }
    findById(id, arr) {
        return arr.find((item) => item.id === id);
    }
    getRoomDetails(roomId) {
        const r = this.rooms.find(r => r.id === roomId);
        return r ? r.getRoomInfo() : "Không tìm thấy phòng";
    }
}
// -------------------- MENU 12 CHỨC NĂNG --------------------
const hotel = new Hotel();
while (true) {
    const choice = prompt(`===== HOTEL MENU =====
1. Thêm khách hàng
2. Thêm phòng (Standard/VIP)
3. Tạo booking
4. Hủy booking
5. Hiển thị phòng trống
6. Hiển thị booking của khách
7. Tính tổng doanh thu
8. Thống kê phòng theo loại
9. Cập nhật tình trạng phòng
10. Tìm khách/room theo ID
11. Xem chi tiết phòng
12. Thoát
Chọn:`);
    if (!choice)
        break;
    switch (choice) {
        case "1": {
            const name = prompt("Tên khách:");
            const email = prompt("Email:");
            const phone = prompt("SĐT:");
            if (name && email && phone)
                hotel.addCustomer(name, email, phone);
            break;
        }
        case "2": {
            const t = prompt("Loại phòng (1: Standard, 2: VIP):");
            const name = prompt("Tên phòng:");
            const price = parseFloat(prompt("Giá/đêm:"));
            if (t === "1") {
                const beds = parseInt(prompt("Số giường:"));
                hotel.addRoom(new StandardRoom(name, price, beds));
            }
            else if (t === "2") {
                const services = prompt("Dịch vụ (ngăn cách bởi dấu ',')").split(",");
                hotel.addRoom(new VIPRoom(name, price, services));
            }
            break;
        }
        case "3": {
            const cid = parseInt(prompt("ID khách hàng:"));
            const rid = parseInt(prompt("ID phòng:"));
            const checkIn = new Date(prompt("Ngày check-in (yyyy-mm-dd):"));
            const checkOut = new Date(prompt("Ngày check-out (yyyy-mm-dd):"));
            const booking = hotel.createBooking(cid, rid, checkIn, checkOut);
            if (booking)
                console.log(" Đã tạo booking:", booking.getDetails());
            break;
        }
        case "4": {
            const bid = parseInt(prompt("ID booking:"));
            hotel.cancelBooking(bid);
            break;
        }
        case "5": {
            const rooms = hotel.listAvailableRooms();
            console.log("Phòng trống:");
            rooms.forEach(r => console.log(r.getRoomInfo()));
            break;
        }
        case "6": {
            const cid = parseInt(prompt("ID khách hàng:"));
            const bookings = hotel.listCustomerBookings(cid);
            if (bookings.length)
                bookings.forEach(b => console.log(b.getDetails()));
            else
                console.log("Không có booking nào.");
            break;
        }
        case "7": {
            console.log("Tổng doanh thu:", hotel.calculateTotalRevenue(), "VND");
            break;
        }
        case "8": {
            console.log("Thống kê phòng theo loại:", hotel.countRoomsByCategory());
            break;
        }
        case "9": {
            const rid = parseInt(prompt("ID phòng:"));
            const avail = prompt("Trạng thái (1: Trống, 0: Đã đặt):") === "1";
            hotel.updateRoomAvailability(rid, avail);
            break;
        }
        case "10": {
            const t = prompt("Tìm (1: Customer, 2: Room):");
            const id = parseInt(prompt("ID:"));
            if (t === "1") {
                const c = hotel.findById(id, hotel.customers);
                console.log(c ? c.getDetails() : "Không tìm thấy khách hàng");
            }
            else if (t === "2") {
                console.log(hotel.getRoomDetails(id));
            }
            break;
        }
        case "11": {
            const rid = parseInt(prompt("ID phòng:"));
            console.log(hotel.getRoomDetails(rid));
            break;
        }
        case "12":
            alert("Thoát chương trình");
            break;
        default:
            alert("Lựa chọn không hợp lệ");
    }
}
