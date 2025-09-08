class MenuItem {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
class Table {
    constructor(id, capacity, available = true) {
        this.id = id;
        this.capacity = capacity;
        this.available = available; // Mặc định bàn trống khi tạo
    }
}
class Reservation {
    constructor(id, customerName, tableId) {
        this.id = id;
        this.customerName = customerName;
        this.tableId = tableId;
    }
}
class Order {
    constructor(id, tableId, items) {
        this.id = id;
        this.tableId = tableId;
        this.items = items;
    }
    // Tính tổng tiền đơn hàng
    getTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }
}
class Restaurant {
    constructor() {
        this.menu = [];
        this.tables = [];
        this.reservations = [];
        this.orders = [];
    }
    addMenuItem(item) {
        this.menu.push(item);
    }
    // Thêm bàn mới
    addTable(table) {
        this.tables.push(table);
    }
    makeReservation(reservationId, customerName, tableId) {
        const table = this.tables.find(t => t.id === tableId);
        if (!table) {
            console.log("Không tìm thấy bàn!");
            return;
        }
        if (!table.available) {
            console.log(`Bàn số ${tableId} đã được đặt trước!`);
            return;
        }
        table.available = false; // Đánh dấu bàn đã được đặt
        const reservation = new Reservation(reservationId, customerName, tableId);
        this.reservations.push(reservation);
        console.log(`Đặt bàn số ${tableId} thành công cho khách ${customerName}.`);
    }
    placeOrder(orderId, tableId, itemIds) {
        const table = this.tables.find(t => t.id === tableId);
        if (!table) {
            console.log("Không tìm thấy bàn!");
            return;
        }
        if (table.available) {
            console.log(`Bàn số ${tableId} chưa được đặt, không thể gọi món!`);
            return;
        }
        const orderItems = this.menu.filter(item => itemIds.includes(item.id));
        const order = new Order(orderId, tableId, orderItems);
        this.orders.push(order);
        console.log(`Đã đặt món cho bàn số ${tableId}.`);
    }
    generateBill(tableId) {
        const order = this.orders.find(o => o.tableId === tableId);
        if (!order) {
            console.log("Không tìm thấy đơn hàng của bàn này!");
            return;
        }
        const total = order.getTotal(); // Tính tổng tiền
        console.log(`Tổng tiền bàn ${tableId}: ${total} VND`);
        // Đánh dấu bàn trống lại
        const table = this.tables.find(t => t.id === tableId);
        if (table) {
            table.available = true;
        }
        console.log(`Bàn ${tableId} đã sẵn sàng cho khách mới.`);
    }
}
const restaurant = new Restaurant();
restaurant.addMenuItem(new MenuItem(1, "Phở bò", 50000));
restaurant.addMenuItem(new MenuItem(2, "Bánh mì", 20000));
restaurant.addMenuItem(new MenuItem(3, "Cà phê sữa", 25000));
restaurant.addTable(new Table(1, 4)); // Bàn số 1, 4 chỗ
restaurant.addTable(new Table(2, 2)); // Bàn số 2, 2 chỗ
restaurant.makeReservation(101, "Nguyễn Văn A", 1);
restaurant.placeOrder(201, 1, [1, 3]);
restaurant.generateBill(1);
