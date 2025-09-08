// =========================
// Lớp Product - Sản phẩm thời trang
// =========================
class Product {
    constructor(id, name, category, // Áo, Quần, Giày, Phụ kiện
    price, stock // tồn kho
    ) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.stock = stock;
    }
    displayInfo() {
        console.log(`ID: ${this.id} | Tên: ${this.name} | Loại: ${this.category} | Giá: ${this.price} | Tồn kho: ${this.stock}`);
    }
}
// =========================
// Lớp Customer - Khách hàng
// =========================
class Customer {
    constructor(id, name, phone) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.purchaseHistory = [];
    }
    displayInfo() {
        console.log(`ID: ${this.id} | Tên: ${this.name} | SĐT: ${this.phone}`);
        if (this.purchaseHistory.length === 0) {
            console.log("  Chưa có đơn hàng nào.");
        }
        else {
            console.log("  Lịch sử đơn hàng:");
            this.purchaseHistory.forEach(o => console.log(`   - Đơn ${o.id}, Tổng: ${o.getTotal()} VND, Trạng thái: ${o.status}`));
        }
    }
}
// =========================
// Lớp OrderItem - Sản phẩm trong đơn hàng
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
// Lớp Order - Đơn hàng
// =========================
class Order {
    constructor(id, customer) {
        this.id = id;
        this.customer = customer;
        this.items = [];
        this.status = "Đang xử lý"; // "Đang xử lý", "Đã giao", "Đã huỷ"
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
        const index = this.items.findIndex(i => i.product.id === productId);
        if (index >= 0) {
            this.items[index].product.stock += this.items[index].quantity;
            this.items.splice(index, 1);
        }
    }
    getTotal() {
        return this.items.reduce((sum, item) => sum + item.getTotal(), 0);
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
// Lớp FashionStore - Quản lý cửa hàng
// =========================
class FashionStore {
    constructor() {
        this.products = [];
        this.customers = [];
        this.orders = [];
    }
    // ====== Quản lý sản phẩm ======
    addProduct(product) {
        if (this.products.some(p => p.id === product.id)) {
            console.log(`❌ Sản phẩm ID ${product.id} đã tồn tại.`);
            return;
        }
        this.products.push(product);
        console.log(`✅ Đã thêm sản phẩm: ${product.name}`);
    }
    updateProduct(id, newData) {
        const product = this.products.find(p => p.id === id);
        if (product)
            Object.assign(product, newData);
    }
    deleteProduct(id) {
        this.products = this.products.filter(p => p.id !== id);
    }
    searchProducts(keyword) {
        return this.products.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()) ||
            p.category.toLowerCase().includes(keyword.toLowerCase()));
    }
    filterByPrice(min, max) {
        return this.products.filter(p => p.price >= min && p.price <= max);
    }
    sortProductsByPrice(order) {
        this.products.sort((a, b) => order === 'asc' ? a.price - b.price : b.price - a.price);
    }
    listProducts() {
        console.log("📋 Danh sách sản phẩm:");
        this.products.forEach(p => p.displayInfo());
    }
    listLowStock(threshold = 5) {
        console.log(`⚠️ Sản phẩm sắp hết hàng (tồn kho <= ${threshold}):`);
        this.products.filter(p => p.stock <= threshold).forEach(p => p.displayInfo());
    }
    // ====== Quản lý khách hàng ======
    addCustomer(customer) {
        if (this.customers.some(c => c.id === customer.id)) {
            console.log(`❌ Khách hàng ID ${customer.id} đã tồn tại.`);
            return;
        }
        this.customers.push(customer);
    }
    searchCustomer(keyword) {
        return this.customers.filter(c => c.name.toLowerCase().includes(keyword.toLowerCase()) || c.phone.includes(keyword));
    }
    listCustomers() {
        console.log("📋 Danh sách khách hàng:");
        this.customers.forEach(c => c.displayInfo());
    }
    // ====== Quản lý đơn hàng ======
    createOrder(order) {
        this.orders.push(order);
        order.customer.purchaseHistory.push(order);
    }
    listOrders(statusFilter) {
        console.log("📋 Danh sách đơn hàng:");
        this.orders.filter(o => !statusFilter || o.status === statusFilter)
            .forEach(o => o.displayInfo());
    }
    cancelOrder(orderId) {
        const order = this.orders.find(o => o.id === orderId);
        if (order && order.status === "Đang xử lý") {
            order.items.forEach(i => i.product.stock += i.quantity);
            order.updateStatus("Đã huỷ");
            console.log(`✅ Đã huỷ đơn ${orderId}`);
        }
    }
    // ====== Thống kê ======
    getRevenue(statusFilter = "Đã giao") {
        return this.orders
            .filter(o => o.status === statusFilter)
            .reduce((sum, o) => sum + o.getTotal(), 0);
    }
    totalProducts() {
        return this.products.length;
    }
    totalOrders() {
        return this.orders.length;
    }
}
// =========================
// Demo sử dụng
// =========================
const store = new FashionStore();
// Thêm sản phẩm
store.addProduct(new Product(1, "Áo thun", "Áo", 200000, 10));
store.addProduct(new Product(2, "Quần jeans", "Quần", 350000, 5));
store.addProduct(new Product(3, "Giày sneaker", "Giày", 800000, 3));
store.addProduct(new Product(4, "Túi xách", "Phụ kiện", 150000, 8));
// Thêm khách hàng
const cus1 = new Customer(1, "Nguyễn Văn A", "0901234567");
const cus2 = new Customer(2, "Trần Thị B", "0912345678");
store.addCustomer(cus1);
store.addCustomer(cus2);
// Tạo đơn hàng
const order1 = new Order(1, cus1);
order1.addItem(store.searchProducts("Áo")[0], 2);
order1.addItem(store.searchProducts("Giày")[0], 1);
store.createOrder(order1);
const order2 = new Order(2, cus2);
order2.addItem(store.searchProducts("Túi")[0], 2);
store.createOrder(order2);
// Hiển thị danh sách
store.listProducts();
store.listLowStock(5);
store.listCustomers();
store.listOrders();
// Huỷ đơn hàng
store.cancelOrder(2);
// Thống kê
console.log("Tổng doanh thu:", store.getRevenue(), "VND");
console.log("Tổng sản phẩm:", store.totalProducts());
console.log("Tổng đơn hàng:", store.totalOrders());
