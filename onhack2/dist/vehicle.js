// ===========================
// QUẢN LÝ VEHICLE STORE
// ===========================
// ====== Customer ======
class Customer {
    constructor(name, email) {
        this.name = name;
        this.email = email;
        this.id = Customer.nextId++;
    }
    getDetails() {
        return `Customer[ID=${this.id}, Name=${this.name}, Email=${this.email}]`;
    }
}
Customer.nextId = 1;
// ====== Vehicle (Abstract) ======
class Vehicle {
    constructor(name, type, // Car / Motorbike
    price, stock) {
        this.name = name;
        this.type = type;
        this.price = price;
        this.stock = stock;
        this.id = Vehicle.nextId++;
    }
    sell(quantity) {
        if (this.stock < quantity)
            return false;
        this.stock -= quantity;
        return true;
    }
    restock(quantity) {
        this.stock += quantity;
    }
}
Vehicle.nextId = 1;
// ====== Car ======
class Car extends Vehicle {
    constructor(name, price, stock, brand, seats) {
        super(name, "Car", price, stock);
        this.brand = brand;
        this.seats = seats;
    }
    getVehicleInfo() {
        return `Car[ID=${this.id}] ${this.name} - Brand:${this.brand} - Seats:${this.seats} - Price:${this.price} - Stock:${this.stock}`;
    }
    getCategory() { return "Car"; }
}
// ====== Motorbike ======
class Motorbike extends Vehicle {
    constructor(name, price, stock, brand, engine // cc
    ) {
        super(name, "Motorbike", price, stock);
        this.brand = brand;
        this.engine = engine;
    }
    getVehicleInfo() {
        return `Motorbike[ID=${this.id}] ${this.name} - Brand:${this.brand} - Engine:${this.engine}cc - Price:${this.price} - Stock:${this.stock}`;
    }
    getCategory() { return "Motorbike"; }
}
// ====== Order ======
class Order {
    constructor(customer, vehicles) {
        this.customer = customer;
        this.vehicles = vehicles;
        this.orderId = Order.nextOrderId++;
        this.totalAmount = vehicles.reduce((sum, item) => sum + item.vehicle.price * item.quantity, 0);
    }
    getDetails() {
        const list = this.vehicles.map(v => `${v.vehicle.name} x${v.quantity}`).join(", ");
        return `Order[ID=${this.orderId}] Customer=${this.customer.name}, Items=[${list}], Total=${this.totalAmount}`;
    }
}
Order.nextOrderId = 1;
// ====== VehicleStore ======
class VehicleStore {
    constructor() {
        this.vehicles = [];
        this.customers = [];
        this.orders = [];
    }
    // 1) Thêm khách hàng
    addCustomer(name, email) {
        this.customers.push(new Customer(name, email));
        alert("✅ Đã thêm khách hàng!");
    }
    // 2) Thêm Vehicle
    addCar(name, price, stock, brand, seats) {
        this.vehicles.push(new Car(name, price, stock, brand, seats));
        alert("✅ Đã thêm Car!");
    }
    addMotorbike(name, price, stock, brand, engine) {
        this.vehicles.push(new Motorbike(name, price, stock, brand, engine));
        alert("✅ Đã thêm Motorbike!");
    }
    // 3) Đặt mua
    createOrder(customerId, items) {
        const customer = this.findById(customerId, this.customers);
        if (!customer) {
            alert("❌ Không tìm thấy khách hàng");
            return;
        }
        const selected = [];
        for (const it of items) {
            const vehicle = this.findById(it.vehicleId, this.vehicles);
            if (!vehicle) {
                alert(`❌ Không tìm thấy Vehicle ID=${it.vehicleId}`);
                continue;
            }
            if (!vehicle.sell(it.quantity)) {
                alert(`❌ Vehicle ${vehicle.name} không đủ số lượng`);
                continue;
            }
            selected.push({ vehicle, quantity: it.quantity });
        }
        if (selected.length === 0) {
            alert("❌ Không có vehicle hợp lệ");
            return;
        }
        this.orders.push(new Order(customer, selected));
        alert("✅ Đặt vehicle thành công!");
    }
    // 4) Hủy đơn hàng
    cancelOrder(orderId) {
        const idx = this.orders.findIndex(o => o.orderId === orderId);
        if (idx === -1) {
            alert("❌ Không tìm thấy đơn");
            return;
        }
        this.orders[idx].vehicles.forEach(x => x.vehicle.restock(x.quantity));
        this.orders.splice(idx, 1);
        alert("✅ Đã hủy đơn và hoàn lại tồn kho!");
    }
    // 5) Lọc vehicle còn hàng
    listAvailableVehicles() {
        return this.vehicles.filter(v => v.stock > 0);
    }
    // 6) Hiển thị đơn của khách
    listCustomerOrders(customerId) {
        return this.orders.filter(o => o.customer.id === customerId);
    }
    // 7) Tính doanh thu
    calculateTotalRevenue() {
        return this.orders.reduce((sum, o) => sum + o.totalAmount, 0);
    }
    // 8) Thống kê theo loại
    countVehiclesByCategory() {
        return this.vehicles.reduce((acc, v) => {
            const cat = v.getCategory();
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
        }, {});
    }
    // 9) Cập nhật tồn kho
    updateVehicleStock(vehicleId, newStock) {
        const v = this.findById(vehicleId, this.vehicles);
        if (!v) {
            alert("❌ Không tìm thấy Vehicle");
            return;
        }
        v.stock = newStock;
        alert("✅ Đã cập nhật tồn kho!");
    }
    // 10) Tìm kiếm theo ID
    findById(id, arr) {
        return arr.find((x) => x.id === id);
    }
    // 11) Xem chi tiết Vehicle
    getVehicleInfo(vehicleId) {
        const v = this.findById(vehicleId, this.vehicles);
        return v ? v.getVehicleInfo() : "❌ Không tìm thấy Vehicle";
    }
}
// ====== MENU ======
const store = new VehicleStore();
while (true) {
    const choice = prompt(`===== MENU VEHICLE STORE =====
1. Thêm khách hàng
2. Thêm Vehicle (Car/Motorbike)
3. Đặt mua Vehicle
4. Hủy đơn hàng
5. Lọc Vehicle còn hàng
6. Hiển thị đơn của khách
7. Tính doanh thu
8. Thống kê theo loại
9. Cập nhật tồn kho
10. Tìm kiếm theo ID (Customer/Vehicle)
11. Xem thông tin chi tiết Vehicle
12. Thoát
Chọn:`);
    if (!choice)
        break;
    switch (choice) {
        case "1": {
            const name = prompt("Tên khách hàng:");
            const email = prompt("Email:");
            if (!name || !email)
                break;
            store.addCustomer(name, email);
            break;
        }
        case "2": {
            const t = prompt("Loại (1: Car, 2: Motorbike):");
            const name = prompt("Tên:");
            const price = parseFloat(prompt("Giá:"));
            const stock = parseInt(prompt("Số lượng:"));
            if (t === "1") {
                const brand = prompt("Brand:");
                const seats = parseInt(prompt("Số ghế:"));
                store.addCar(name, price, stock, brand, seats);
            }
            else if (t === "2") {
                const brand = prompt("Brand:");
                const engine = parseInt(prompt("Dung tích động cơ (cc):"));
                store.addMotorbike(name, price, stock, brand, engine);
            }
            break;
        }
        case "3": {
            const cid = parseInt(prompt("ID khách hàng:"));
            const n = parseInt(prompt("Số loại Vehicle muốn mua:"));
            const items = [];
            for (let i = 0; i < n; i++) {
                const vid = parseInt(prompt(`Vehicle ID #${i + 1}:`));
                const q = parseInt(prompt("Số lượng:"));
                items.push({ vehicleId: vid, quantity: q });
            }
            store.createOrder(cid, items);
            break;
        }
        case "4": {
            const oid = parseInt(prompt("ID đơn cần hủy:"));
            store.cancelOrder(oid);
            break;
        }
        case "5": {
            const list = store.listAvailableVehicles().map(v => v.getVehicleInfo());
            console.log("Vehicle còn hàng:\n" + (list.length ? list.join("\n") : "Không có"));
            break;
        }
        case "6": {
            const cid = parseInt(prompt("ID khách hàng:"));
            const orders = store.listCustomerOrders(cid).map(o => o.getDetails());
            console.log("Đơn của khách:\n" + (orders.length ? orders.join("\n") : "Không có"));
            break;
        }
        case "7": {
            alert("Tổng doanh thu: " + store.calculateTotalRevenue());
            break;
        }
        case "8": {
            const stat = store.countVehiclesByCategory();
            console.log("Thống kê theo loại:", stat);
            break;
        }
        case "9": {
            const vid = parseInt(prompt("Vehicle ID:"));
            const ns = parseInt(prompt("Tồn kho mới:"));
            store.updateVehicleStock(vid, ns);
            break;
        }
        case "10": {
            const which = prompt("Tìm (1: Customer, 2: Vehicle):");
            const id = parseInt(prompt("ID:"));
            if (which === "1") {
                const c = store.findById(id, store.customers);
                alert(c ? c.getDetails() : "Không tìm thấy Customer");
            }
            else if (which === "2") {
                const v = store.findById(id, store.vehicles);
                alert(v ? v.getVehicleInfo() : "Không tìm thấy Vehicle");
            }
            break;
        }
        case "11": {
            const vid = parseInt(prompt("Vehicle ID:"));
            alert(store.getVehicleInfo(vid));
            break;
        }
        case "12":
            alert("Thoát chương trình");
            break;
        default:
            alert("Lựa chọn không hợp lệ");
    }
}
