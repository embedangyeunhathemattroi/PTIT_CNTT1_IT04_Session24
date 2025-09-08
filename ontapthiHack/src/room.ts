// =======================
// Lớp Room - Phòng khách sạn
// =======================
class Room {
    public status: string = "available"; // available | booked

    constructor(
        public id: number,
        public type: string,    // Đơn, Đôi, Suite
        public price: number
    ) {}

    // Đặt phòng nếu còn trống
    bookRoom(): boolean {
        if (this.status === "available") {
            this.status = "booked";
            return true;
        }
        return false;
    }

    // Hủy phòng
    cancelBooking(): boolean {
        if (this.status === "booked") {
            this.status = "available";
            return true;
        }
        return false;
    }
}

// =======================
// Lớp Customer - Khách hàng
// =======================
class Customer {
    public bookedRooms: Room[] = [];

    constructor(
        public id: number,
        public name: string
    ) {}

    // Đặt phòng
    book(room: Room): boolean {
        if (room.bookRoom()) {
            this.bookedRooms.push(room);
            console.log(`✅ ${this.name} đã đặt phòng ${room.type} (ID: ${room.id})`);
            return true;
        }
        console.log(`❌ Phòng ${room.type} (ID: ${room.id}) đã được đặt`);
        return false;
    }

    // Hủy phòng
    cancel(room: Room): boolean {
        const index = this.bookedRooms.indexOf(room);
        if (index !== -1 && room.cancelBooking()) {
            this.bookedRooms.splice(index, 1);
            console.log(`🗑️ ${this.name} đã hủy phòng ${room.type} (ID: ${room.id})`);
            return true;
        }
        console.log(`❌ ${this.name} không có phòng này để hủy`);
        return false;
    }
}

// =======================
// Lớp Booking - Đặt phòng
// =======================
class Booking {
    constructor(
        public id: number,
        public customerId: number,
        public roomId: number,
        public checkInDate: Date,
        public checkOutDate: Date
    ) {}

    // Kéo dài thời gian đặt phòng
    extendBooking(days: number): void {
        const newCheckOut = new Date(this.checkOutDate);
        newCheckOut.setDate(newCheckOut.getDate() + days);
        this.checkOutDate = newCheckOut;
        console.log(`⏩ Booking ${this.id} đã được kéo dài ${days} ngày`);
    }
}

// =======================
// Lớp Hotel - Quản lý khách sạn
// =======================
class Hotel {
    public rooms: Room[] = [];
    public customers: Customer[] = [];
    public bookings: Booking[] = [];

    // Thêm phòng
    addRoom(room: Room): void {
        this.rooms.push(room);
        console.log(`🏨 Đã thêm phòng ${room.type} (ID: ${room.id}, Giá: ${room.price})`);
    }

    // Xóa phòng
    removeRoom(roomId: number): void {
        this.rooms = this.rooms.filter(r => r.id !== roomId);
        console.log(`🗑️ Đã xóa phòng ID ${roomId}`);
    }

    // Thêm khách hàng
    addCustomer(customer: Customer): void {
        this.customers.push(customer);
        console.log(`👤 Đã thêm khách hàng ${customer.name}`);
    }

    // Tìm phòng theo loại
    findRoomByType(type: string): Room[] {
        return this.rooms.filter(r => r.type.toLowerCase().includes(type.toLowerCase()));
    }

    // Tìm phòng theo giá <= maxPrice
    findRoomByPrice(maxPrice: number): Room[] {
        return this.rooms.filter(r => r.price <= maxPrice);
    }

    // Đặt phòng cho khách
    bookRoom(customerId: number, roomId: number, checkIn: Date, checkOut: Date): void {
        const customer = this.customers.find(c => c.id === customerId);
        const room = this.rooms.find(r => r.id === roomId);
        if (customer && room && customer.book(room)) {
            const booking = new Booking(this.bookings.length + 1, customerId, roomId, checkIn, checkOut);
            this.bookings.push(booking);
        }
    }

    // Hủy phòng
    cancelBooking(customerId: number, roomId: number): void {
        const customer = this.customers.find(c => c.id === customerId);
        const room = this.rooms.find(r => r.id === roomId);
        if (customer && room && customer.cancel(room)) {
            this.bookings = this.bookings.filter(b => !(b.customerId === customerId && b.roomId === roomId));
        }
    }

    // Kéo dài booking
    extendBooking(bookingId: number, days: number): void {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (booking) booking.extendBooking(days);
    }

    // Thống kê
    stats(): void {
        const totalRooms = this.rooms.length;
        const booked = this.rooms.filter(r => r.status === "booked").length;
        const available = totalRooms - booked;
        const revenue = this.rooms.filter(r => r.status === "booked").reduce((sum, r) => sum + r.price, 0);
        console.log("📊 Thống kê khách sạn:");
        console.log(`- Tổng số phòng: ${totalRooms}`);
        console.log(`- Phòng đã đặt: ${booked}`);
        console.log(`- Phòng còn trống: ${available}`);
        console.log(`- Doanh thu hiện tại: ${revenue}`);
    }
}

// =======================
// Demo sử dụng
// =======================
const hotel = new Hotel();

// Thêm phòng
hotel.addRoom(new Room(1, "Đơn", 500000));
hotel.addRoom(new Room(2, "Đôi", 800000));
hotel.addRoom(new Room(3, "Suite", 1500000));

// Thêm khách hàng
hotel.addCustomer(new Customer(1, "Nguyễn Văn A"));
hotel.addCustomer(new Customer(2, "Trần Thị B"));

// Đặt phòng
hotel.bookRoom(1, 1, new Date("2025-08-14"), new Date("2025-08-16"));
hotel.bookRoom(2, 2, new Date("2025-08-15"), new Date("2025-08-18"));

// Kéo dài booking
hotel.extendBooking(1, 2);

// Hủy booking
hotel.cancelBooking(2, 2);

// Thống kê
hotel.stats();

// Tìm phòng theo loại
console.log("🔍 Tìm phòng loại 'Suite':", hotel.findRoomByType("Suite"));

// Tìm phòng theo giá <= 800000
console.log("🔍 Tìm phòng giá <= 800000:", hotel.findRoomByPrice(800000));
