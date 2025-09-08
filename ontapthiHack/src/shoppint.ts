// =========================
// Lớp Product - Sản phẩm thời trang
// =========================
class Product {
    constructor(
        public id: number,
        public name: string,
        public category: string, // Áo, Quần, Giày, Phụ kiện
        public price: number,
        public stock: number // tồn kho
    ) {}

    displayInfo(): void {
        console.log(`ID: ${this.id} | Tên: ${this.name} | Loại: ${this.category} | Giá: ${this.price} | Tồn kho: ${this.stock}`);
    }
}

// =========================
// Lớp Customer - Khách hàng
// =========================
class Customer {
    public purchaseHistory: Order[] = [];

    constructor(
        public id: number,
        public name: string,
        public phone: string
    ) {}

    displayInfo(): void {
        console.log(`ID: ${this.id} | Tên: ${this.name} | SĐT: ${this.phone}`);
        if (this.purchaseHistory.length === 0) {
            console.log("  Chưa có đơn hàng nào.");
        } else {
            console.log("  Lịch sử đơn hàng:");
            this.purchaseHistory.forEach(o => console.log(`   - Đơn ${o.id}, Tổng: ${o.getTotal()} VND, Trạng thái: ${o.status}`));
        }
    }
}

// =========================
// Lớp OrderItem - Sản phẩm trong đơn hàng
// =========================
class OrderItem {
    constructor(
        public product: Product,
        public quantity: number
    ) {}

    getTotal(): number {
        return this.product.price * this.quantity;
    }
}

// =========================
// Lớp Order - Đơn hàng
// =========================
class Order {
    public items: OrderItem[] = [];
    public status: string = "Đang xử lý"; // "Đang xử lý", "Đã giao", "Đã huỷ"

    constructor(
        public id: number,
        public customer: Customer
    ) {}

    addItem(product: Product, quantity: number): void {
        if (product.stock >= quantity) {
            this.items.push(new OrderItem(product, quantity));
            product.stock -= quantity;
        } else {
            console.log(`❌ Không đủ hàng: ${product.name}`);
        }
    }

    removeItem(productId: number): void {
        const index = this.items.findIndex(i => i.product.id === productId);
        if (index >= 0) {
            this.items[index].product.stock += this.items[index].quantity;
            this.items.splice(index, 1);
        }
    }

    getTotal(): number {
        return this.items.reduce((sum, item) => sum + item.getTotal(), 0);
    }

    updateStatus(newStatus: string): void {
        this.status = newStatus;
    }

    displayInfo(): void {
        console.log(`Đơn ${this.id} | Khách: ${this.customer.name} | Trạng thái: ${this.status} | Tổng: ${this.getTotal()} VND`);
        this.items.forEach(i => console.log(`   - ${i.product.name} x${i.quantity} = ${i.getTotal()} VND`));
    }
}

// =========================
// Lớp FashionStore - Quản lý cửa hàng
// =========================
class FashionStore {
    private products: Product[] = [];
    private customers: Customer[] = [];
    private orders: Order[] = [];

    // ====== Quản lý sản phẩm ======
    addProduct(product: Product): void {
        if (this.products.some(p => p.id === product.id)) {
            console.log(`❌ Sản phẩm ID ${product.id} đã tồn tại.`);
            return;
        }
        this.products.push(product);
        console.log(`✅ Đã thêm sản phẩm: ${product.name}`);
    }

    updateProduct(id: number, newData: Partial<Product>): void {
        const product = this.products.find(p => p.id === id);
        if (product) Object.assign(product, newData);
    }

    deleteProduct(id: number): void {
        this.products = this.products.filter(p => p.id !== id);
    }

    searchProducts(keyword: string): Product[] {
        return this.products.filter(p => 
            p.name.toLowerCase().includes(keyword.toLowerCase()) ||
            p.category.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    filterByPrice(min: number, max: number): Product[] {
        return this.products.filter(p => p.price >= min && p.price <= max);
    }

    sortProductsByPrice(order: 'asc'|'desc'): void {
        this.products.sort((a, b) => order==='asc'? a.price-b.price : b.price-a.price);
    }

    listProducts(): void {
        console.log("📋 Danh sách sản phẩm:");
        this.products.forEach(p => p.displayInfo());
    }

    listLowStock(threshold: number = 5): void {
        console.log(`⚠️ Sản phẩm sắp hết hàng (tồn kho <= ${threshold}):`);
        this.products.filter(p => p.stock <= threshold).forEach(p => p.displayInfo());
    }

    // ====== Quản lý khách hàng ======
    addCustomer(customer: Customer): void {
        if (this.customers.some(c => c.id === customer.id)) {
            console.log(`❌ Khách hàng ID ${customer.id} đã tồn tại.`);
            return;
        }
        this.customers.push(customer);
    }

    searchCustomer(keyword: string): Customer[] {
        return this.customers.filter(c => c.name.toLowerCase().includes(keyword.toLowerCase()) || c.phone.includes(keyword));
    }

    listCustomers(): void {
        console.log("📋 Danh sách khách hàng:");
        this.customers.forEach(c => c.displayInfo());
    }

    // ====== Quản lý đơn hàng ======
    createOrder(order: Order): void {
        this.orders.push(order);
        order.customer.purchaseHistory.push(order);
    }

    listOrders(statusFilter?: string): void {
        console.log("📋 Danh sách đơn hàng:");
        this.orders.filter(o => !statusFilter || o.status === statusFilter)
                   .forEach(o => o.displayInfo());
    }

    cancelOrder(orderId: number): void {
        const order = this.orders.find(o => o.id === orderId);
        if (order && order.status === "Đang xử lý") {
            order.items.forEach(i => i.product.stock += i.quantity);
            order.updateStatus("Đã huỷ");
            console.log(`✅ Đã huỷ đơn ${orderId}`);
        }
    }

    // ====== Thống kê ======
    getRevenue(statusFilter: string = "Đã giao"): number {
        return this.orders
            .filter(o => o.status === statusFilter)
            .reduce((sum, o) => sum + o.getTotal(), 0);
    }

    totalProducts(): number {
        return this.products.length;
    }

    totalOrders(): number {
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
