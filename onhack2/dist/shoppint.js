"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = require("readline-sync");
// =========================
// LỚP PRODUCT
// =========================
class Product {
    constructor(id, name, category, price, stock) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
    }
    displayInfo() {
        console.log(`ID: ${this.id} | ${this.name} | Loại: ${this.category} | Giá: ${this.price} | Tồn kho: ${this.stock}`);
    }
}
// =========================
// LỚP CUSTOMER
// =========================
class Customer {
    constructor(id, name, phone) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.purchaseHistory = [];
    }
    displayInfo() {
        console.log(`ID: ${this.id} | ${this.name} | SĐT: ${this.phone}`);
        if (this.purchaseHistory.length === 0)
            console.log("  Chưa có đơn hàng nào.");
        else {
            console.log("  Lịch sử đơn hàng:");
            this.purchaseHistory.forEach(o => console.log(`   - Đơn ${o.id} | Tổng: ${o.getTotal()} VND | Trạng thái: ${o.status}`));
        }
    }
}
// =========================
// LỚP ORDERITEM
// =========================
class OrderItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }
    getTotal() {
        return this.product.price * this.quantity;
    }
}
// =========================
// LỚP ORDER
// =========================
class Order {
    constructor(id, customer) {
        this.id = id;
        this.customer = customer;
        this.items = [];
        this.status = "Đang xử lý";
    }
    addItem(product, quantity) {
        if (product.stock >= quantity) {
            this.items.push(new OrderItem(product, quantity));
            product.stock -= quantity;
        }
        else {
            console.log(`❌ Không đủ hàng: ${product.name}`);
        }
    }
    removeItem(productId) {
        const idx = this.items.findIndex(i => i.product.id === productId);
        if (idx >= 0) {
            this.items[idx].product.stock += this.items[idx].quantity;
            this.items.splice(idx, 1);
        }
    }
    getTotal() {
        return this.items.reduce((sum, i) => sum + i.getTotal(), 0);
    }
    updateStatus(newStatus) {
        this.status = newStatus;
    }
    displayInfo() {
        console.log(`Đơn ${this.id} | Khách: ${this.customer.name} | Trạng thái: ${this.status} | Tổng: ${this.getTotal()} VND`);
        this.items.forEach(i => console.log(`   - ${i.product.name} x${i.quantity} = ${i.getTotal()} VND`));
    }
}
// =========================
// LỚP FASHIONSTORE
// =========================
class FashionStore {
    constructor() {
        this.products = [];
        this.customers = [];
        this.orders = [];
    }
    addProduct(p) {
        if (this.products.some(x => x.id === p.id))
            return console.log(`❌ Sản phẩm ${p.id} đã tồn tại.`);
        this.products.push(p);
        console.log(`✅ Thêm sản phẩm: ${p.name}`);
    }
    updateProduct(id, newData) {
        const p = this.products.find(x => x.id === id);
        if (!p)
            return console.log(`❌ Không tìm thấy sản phẩm ${id}`);
        Object.assign(p, newData);
        console.log(`✅ Cập nhật sản phẩm ${id}`);
    }
    deleteProduct(id) {
        this.products = this.products.filter(x => x.id !== id);
        console.log(`✅ Xóa sản phẩm ${id}`);
    }
    listProducts() {
        console.log("\n📋 Danh sách sản phẩm:");
        this.products.forEach(p => p.displayInfo());
    }
    searchProducts(keyword) {
        return this.products.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()) || p.category.toLowerCase().includes(keyword.toLowerCase()));
    }
    filterByPrice(min, max) {
        return this.products.filter(p => p.price >= min && p.price <= max);
    }
    sortProductsByPrice(order) {
        this.products.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
    }
    addCustomer(c) {
        if (this.customers.some(x => x.id === c.id))
            return console.log(`❌ Khách hàng ${c.id} đã tồn tại.`);
        this.customers.push(c);
        console.log(`✅ Thêm khách hàng: ${c.name}`);
    }
    listCustomers() {
        console.log("\n📋 Danh sách khách hàng:");
        this.customers.forEach(c => c.displayInfo());
    }
    searchCustomer(keyword) {
        return this.customers.filter(c => c.name.toLowerCase().includes(keyword.toLowerCase()) || c.phone.includes(keyword));
    }
    createOrder(order) {
        this.orders.push(order);
        order.customer.purchaseHistory.push(order);
        console.log(`✅ Tạo đơn ${order.id} cho khách ${order.customer.name}`);
    }
    listOrders(statusFilter) {
        console.log("\n📋 Danh sách đơn hàng:");
        this.orders.filter(o => !statusFilter || o.status === statusFilter).forEach(o => o.displayInfo());
    }
    cancelOrder(orderId) {
        const o = this.orders.find(x => x.id === orderId);
        if (o && o.status === "Đang xử lý") {
            o.items.forEach(i => i.product.stock += i.quantity);
            o.updateStatus("Đã huỷ");
            console.log(`✅ Huỷ đơn ${orderId}`);
        }
    }
    getRevenue(statusFilter = "Đã giao") {
        return this.orders.filter(o => o.status === statusFilter).reduce((sum, o) => sum + o.getTotal(), 0);
    }
    totalProducts() { return this.products.length; }
    totalOrders() { return this.orders.length; }
}
// =========================
// HELPER DIVIDER
// =========================
function divider(title) {
    console.log("\n" + "─".repeat(16) + ` ${title} ` + "─".repeat(16));
}
// =========================
// MENU
// =========================
function menu() {
    const store = new FashionStore();
    let running = true;
    while (running) {
        console.log("\n===== FASHION STORE MENU =====");
        console.log("1. Quản lý sản phẩm");
        console.log("2. Quản lý khách hàng");
        console.log("3. Quản lý đơn hàng");
        console.log("4. Thống kê");
        console.log("5. Thoát");
        const choice = readline_sync_1.default.question("Chọn chức năng: ");
        switch (choice) {
            case "1":
                manageProducts(store);
                break;
            case "2":
                manageCustomers(store);
                break;
            case "3":
                manageOrders(store);
                break;
            case "4":
                showStats(store);
                break;
            case "5":
                running = false;
                console.log("👋 Thoát chương trình.");
                break;
            default:
                console.log("❌ Lựa chọn không hợp lệ.");
        }
    }
}
// =========================
// FUNCTION QUẢN LÝ SẢN PHẨM
// =========================
function manageProducts(store) {
    let back = false;
    while (!back) {
        console.log("\n--- Quản lý sản phẩm ---");
        console.log("1. Thêm sản phẩm");
        console.log("2. Sửa sản phẩm");
        console.log("3. Xóa sản phẩm");
        console.log("4. Danh sách sản phẩm");
        console.log("5. Tìm kiếm sản phẩm");
        console.log("6. Lọc giá sản phẩm");
        console.log("7. Sắp xếp theo giá");
        console.log("8. Quay lại menu chính");
        const choice = readline_sync_1.default.question("Chọn: ");
        switch (choice) {
            case "1":
                const pid = parseInt(readline_sync_1.default.question("ID: "));
                const pname = readline_sync_1.default.question("Tên: ");
                const pcat = readline_sync_1.default.question("Loại: ");
                const pprice = parseInt(readline_sync_1.default.question("Giá: "));
                const pstock = parseInt(readline_sync_1.default.question("Tồn kho: "));
                store.addProduct(new Product(pid, pname, pcat, pprice, pstock));
                break;
            case "2":
                const upid = parseInt(readline_sync_1.default.question("ID cần sửa: "));
                const upname = readline_sync_1.default.question("Tên mới (để trống nếu giữ nguyên): ");
                const upcat = readline_sync_1.default.question("Loại mới: ");
                const upprice = readline_sync_1.default.question("Giá mới: ");
                const upstock = readline_sync_1.default.question("Tồn kho mới: ");
                store.updateProduct(upid, {
                    name: upname || undefined,
                    category: upcat || undefined,
                    price: upprice ? parseInt(upprice) : undefined,
                    stock: upstock ? parseInt(upstock) : undefined
                });
                break;
            case "3":
                const delid = parseInt(readline_sync_1.default.question("ID cần xóa: "));
                store.deleteProduct(delid);
                break;
            case "4":
                store.listProducts();
                break;
            case "5":
                const key = readline_sync_1.default.question("Từ khóa tìm kiếm: ");
                const results = store.searchProducts(key);
                results.forEach(p => p.displayInfo());
                break;
            case "6":
                const min = parseInt(readline_sync_1.default.question("Giá min: "));
                const max = parseInt(readline_sync_1.default.question("Giá max: "));
                const filt = store.filterByPrice(min, max);
                filt.forEach(p => p.displayInfo());
                break;
            case "7":
                const ord = readline_sync_1.default.question("asc/desc: ");
                store.sortProductsByPrice(ord);
                store.listProducts();
                break;
            case "8":
                back = true;
                break;
            default: console.log("❌ Không hợp lệ.");
        }
    }
}
// =========================
// FUNCTION QUẢN LÝ KHÁCH HÀNG
// =========================
function manageCustomers(store) {
    let back = false;
    while (!back) {
        console.log("\n--- Quản lý khách hàng ---");
        console.log("1. Thêm khách hàng");
        console.log("2. Danh sách khách hàng");
        console.log("3. Tìm kiếm khách hàng");
        console.log("4. Quay lại menu chính");
        const choice = readline_sync_1.default.question("Chọn: ");
        switch (choice) {
            case "1":
                const cid = parseInt(readline_sync_1.default.question("ID: "));
                const cname = readline_sync_1.default.question("Tên: ");
                const cphone = readline_sync_1.default.question("SĐT: ");
                store.addCustomer(new Customer(cid, cname, cphone));
                break;
            case "2":
                store.listCustomers();
                break;
            case "3":
                const key = readline_sync_1.default.question("Từ khóa: ");
                const res = store.searchCustomer(key);
                res.forEach(c => c.displayInfo());
                break;
            case "4":
                back = true;
                break;
            default: console.log("❌ Không hợp lệ.");
        }
    }
}
// =========================
// FUNCTION QUẢN LÝ ĐƠN HÀNG
// =========================
function manageOrders(store) {
    let back = false;
    while (!back) {
        console.log("\n--- Quản lý đơn hàng ---");
        console.log("1. Tạo đơn hàng");
        console.log("2. Danh sách đơn hàng");
        console.log("3. Huỷ đơn hàng");
        console.log("4. Quay lại menu chính");
        const choice = readline_sync_1.default.question("Chọn: ");
        switch (choice) {
            case "1":
                const oid = parseInt(readline_sync_1.default.question("ID đơn hàng: "));
                const custid = parseInt(readline_sync_1.default.question("ID khách hàng: "));
                const cust = store.customers.find(c => c.id === custid);
                if (!cust) {
                    console.log("❌ Không tìm thấy khách hàng");
                    break;
                }
                const order = new Order(oid, cust);
                let adding = true;
                while (adding) {
                    const pid = parseInt(readline_sync_1.default.question("ID sản phẩm thêm (0 để dừng): "));
                    if (pid === 0) {
                        adding = false;
                        break;
                    }
                    const p = store.products.find(x => x.id === pid);
                    if (!p) {
                        console.log("❌ Không tìm thấy sản phẩm");
                        continue;
                    }
                    const qty = parseInt(readline_sync_1.default.question("Số lượng: "));
                    order.addItem(p, qty);
                }
                store.createOrder(order);
                break;
            case "2":
                store.listOrders();
                break;
            case "3":
                const oidc = parseInt(readline_sync_1.default.question("ID đơn cần huỷ: "));
                store.cancelOrder(oidc);
                break;
            case "4":
                back = true;
                break;
            default: console.log("❌ Không hợp lệ.");
        }
    }
}
// =========================
// FUNCTION THỐNG KÊ
// =========================
function showStats(store) {
    console.log("\n--- Thống kê ---");
    console.log("Tổng sản phẩm:", store.totalProducts());
    console.log("Tổng đơn hàng:", store.totalOrders());
    console.log("Doanh thu (Đã giao):", store.getRevenue());
}
// =========================
// CHẠY MENU
// =========================
menu();
