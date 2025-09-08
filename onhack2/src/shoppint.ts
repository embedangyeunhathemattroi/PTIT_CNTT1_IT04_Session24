import readlineSync from "readline-sync";

// =========================
// LỚP PRODUCT
// =========================
class Product {
    constructor(
        public id: number,
        public name: string,
        public category: string,
        public price: number,
        public stock: number
    ) {}

    displayInfo(): void {
        console.log(`ID: ${this.id} | ${this.name} | Loại: ${this.category} | Giá: ${this.price} | Tồn kho: ${this.stock}`);
    }
}

// =========================
// LỚP CUSTOMER
// =========================
class Customer {
    public purchaseHistory: Order[] = [];

    constructor(public id: number, public name: string, public phone: string) {}

    displayInfo(): void {
        console.log(`ID: ${this.id} | ${this.name} | SĐT: ${this.phone}`);
        if (this.purchaseHistory.length === 0) console.log("  Chưa có đơn hàng nào.");
        else {
            console.log("  Lịch sử đơn hàng:");
            this.purchaseHistory.forEach(o =>
                console.log(`   - Đơn ${o.id} | Tổng: ${o.getTotal()} VND | Trạng thái: ${o.status}`)
            );
        }
    }
}

// =========================
// LỚP ORDERITEM
// =========================
class OrderItem {
    constructor(public product: Product, public quantity: number) {}
    getTotal(): number {
        return this.product.price * this.quantity;
    }
}

// =========================
// LỚP ORDER
// =========================
class Order {
    public items: OrderItem[] = [];
    public status: string = "Đang xử lý";

    constructor(public id: number, public customer: Customer) {}

    addItem(product: Product, quantity: number): void {
        if (product.stock >= quantity) {
            this.items.push(new OrderItem(product, quantity));
            product.stock -= quantity;
        } else {
            console.log(`❌ Không đủ hàng: ${product.name}`);
        }
    }

    removeItem(productId: number): void {
        const idx = this.items.findIndex(i => i.product.id === productId);
        if (idx >= 0) {
            this.items[idx].product.stock += this.items[idx].quantity;
            this.items.splice(idx, 1);
        }
    }

    getTotal(): number {
        return this.items.reduce((sum, i) => sum + i.getTotal(), 0);
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
// LỚP FASHIONSTORE
// =========================
class FashionStore {
    private products: Product[] = [];
    private customers: Customer[] = [];
    private orders: Order[] = [];

    addProduct(p: Product): void {
        if (this.products.some(x => x.id === p.id)) return console.log(`❌ Sản phẩm ${p.id} đã tồn tại.`);
        this.products.push(p);
        console.log(`✅ Thêm sản phẩm: ${p.name}`);
    }

    updateProduct(id: number, newData: Partial<Product>): void {
        const p = this.products.find(x => x.id === id);
        if (!p) return console.log(`❌ Không tìm thấy sản phẩm ${id}`);
        Object.assign(p, newData);
        console.log(`✅ Cập nhật sản phẩm ${id}`);
    }

    deleteProduct(id: number): void {
        this.products = this.products.filter(x => x.id !== id);
        console.log(`✅ Xóa sản phẩm ${id}`);
    }

    listProducts(): void {
        console.log("\n📋 Danh sách sản phẩm:");
        this.products.forEach(p => p.displayInfo());
    }

    searchProducts(keyword: string): Product[] {
        return this.products.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()) || p.category.toLowerCase().includes(keyword.toLowerCase()));
    }

    filterByPrice(min: number, max: number): Product[] {
        return this.products.filter(p => p.price >= min && p.price <= max);
    }

    sortProductsByPrice(order: 'asc'|'desc'): void {
        this.products.sort((a,b) => order==='asc'? a.price-b.price : b.price-a.price);
    }

    addCustomer(c: Customer): void {
        if (this.customers.some(x => x.id === c.id)) return console.log(`❌ Khách hàng ${c.id} đã tồn tại.`);
        this.customers.push(c);
        console.log(`✅ Thêm khách hàng: ${c.name}`);
    }

    listCustomers(): void {
        console.log("\n📋 Danh sách khách hàng:");
        this.customers.forEach(c => c.displayInfo());
    }

    searchCustomer(keyword: string): Customer[] {
        return this.customers.filter(c => c.name.toLowerCase().includes(keyword.toLowerCase()) || c.phone.includes(keyword));
    }

    createOrder(order: Order): void {
        this.orders.push(order);
        order.customer.purchaseHistory.push(order);
        console.log(`✅ Tạo đơn ${order.id} cho khách ${order.customer.name}`);
    }

    listOrders(statusFilter?: string): void {
        console.log("\n📋 Danh sách đơn hàng:");
        this.orders.filter(o => !statusFilter || o.status===statusFilter).forEach(o => o.displayInfo());
    }

    cancelOrder(orderId: number): void {
        const o = this.orders.find(x => x.id===orderId);
        if (o && o.status==="Đang xử lý") {
            o.items.forEach(i => i.product.stock += i.quantity);
            o.updateStatus("Đã huỷ");
            console.log(`✅ Huỷ đơn ${orderId}`);
        }
    }

    getRevenue(statusFilter: string = "Đã giao"): number {
        return this.orders.filter(o => o.status===statusFilter).reduce((sum,o)=>sum+o.getTotal(),0);
    }

    totalProducts(): number { return this.products.length; }
    totalOrders(): number { return this.orders.length; }
}

// =========================
// HELPER DIVIDER
// =========================
function divider(title: string) {
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

        const choice = readlineSync.question("Chọn chức năng: ");

        switch(choice) {
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
function manageProducts(store: FashionStore) {
    let back = false;
    while(!back) {
        console.log("\n--- Quản lý sản phẩm ---");
        console.log("1. Thêm sản phẩm");
        console.log("2. Sửa sản phẩm");
        console.log("3. Xóa sản phẩm");
        console.log("4. Danh sách sản phẩm");
        console.log("5. Tìm kiếm sản phẩm");
        console.log("6. Lọc giá sản phẩm");
        console.log("7. Sắp xếp theo giá");
        console.log("8. Quay lại menu chính");
        const choice = readlineSync.question("Chọn: ");
        switch(choice) {
            case "1":
                const pid = parseInt(readlineSync.question("ID: "));
                const pname = readlineSync.question("Tên: ");
                const pcat = readlineSync.question("Loại: ");
                const pprice = parseInt(readlineSync.question("Giá: "));
                const pstock = parseInt(readlineSync.question("Tồn kho: "));
                store.addProduct(new Product(pid,pname,pcat,pprice,pstock));
                break;
            case "2":
                const upid = parseInt(readlineSync.question("ID cần sửa: "));
                const upname = readlineSync.question("Tên mới (để trống nếu giữ nguyên): ");
                const upcat = readlineSync.question("Loại mới: ");
                const upprice = readlineSync.question("Giá mới: ");
                const upstock = readlineSync.question("Tồn kho mới: ");
                store.updateProduct(upid,{
                    name: upname||undefined,
                    category: upcat||undefined,
                    price: upprice?parseInt(upprice):undefined,
                    stock: upstock?parseInt(upstock):undefined
                });
                break;
            case "3":
                const delid = parseInt(readlineSync.question("ID cần xóa: "));
                store.deleteProduct(delid);
                break;
            case "4":
                store.listProducts();
                break;
            case "5":
                const key = readlineSync.question("Từ khóa tìm kiếm: ");
                const results = store.searchProducts(key);
                results.forEach(p=>p.displayInfo());
                break;
            case "6":
                const min = parseInt(readlineSync.question("Giá min: "));
                const max = parseInt(readlineSync.question("Giá max: "));
                const filt = store.filterByPrice(min,max);
                filt.forEach(p=>p.displayInfo());
                break;
            case "7":
                const ord = readlineSync.question("asc/desc: ") as 'asc'|'desc';
                store.sortProductsByPrice(ord);
                store.listProducts();
                break;
            case "8": back=true; break;
            default: console.log("❌ Không hợp lệ.");
        }
    }
}

// =========================
// FUNCTION QUẢN LÝ KHÁCH HÀNG
// =========================
function manageCustomers(store: FashionStore) {
    let back=false;
    while(!back){
        console.log("\n--- Quản lý khách hàng ---");
        console.log("1. Thêm khách hàng");
        console.log("2. Danh sách khách hàng");
        console.log("3. Tìm kiếm khách hàng");
        console.log("4. Quay lại menu chính");
        const choice = readlineSync.question("Chọn: ");
        switch(choice){
            case "1":
                const cid=parseInt(readlineSync.question("ID: "));
                const cname=readlineSync.question("Tên: ");
                const cphone=readlineSync.question("SĐT: ");
                store.addCustomer(new Customer(cid,cname,cphone));
                break;
            case "2": store.listCustomers(); break;
            case "3":
                const key=readlineSync.question("Từ khóa: ");
                const res=store.searchCustomer(key);
                res.forEach(c=>c.displayInfo());
                break;
            case "4": back=true; break;
            default: console.log("❌ Không hợp lệ.");
        }
    }
}

// =========================
// FUNCTION QUẢN LÝ ĐƠN HÀNG
// =========================
function manageOrders(store: FashionStore){
    let back=false;
    while(!back){
        console.log("\n--- Quản lý đơn hàng ---");
        console.log("1. Tạo đơn hàng");
        console.log("2. Danh sách đơn hàng");
        console.log("3. Huỷ đơn hàng");
        console.log("4. Quay lại menu chính");
        const choice = readlineSync.question("Chọn: ");
        switch(choice){
            case "1":
                const oid=parseInt(readlineSync.question("ID đơn hàng: "));
                const custid=parseInt(readlineSync.question("ID khách hàng: "));
                const cust = store.customers.find(c=>c.id===custid);
                if(!cust){ console.log("❌ Không tìm thấy khách hàng"); break; }
                const order=new Order(oid,cust);
                let adding=true;
                while(adding){
                    const pid=parseInt(readlineSync.question("ID sản phẩm thêm (0 để dừng): "));
                    if(pid===0){adding=false; break;}
                    const p=store.products.find(x=>x.id===pid);
                    if(!p){ console.log("❌ Không tìm thấy sản phẩm"); continue;}
                    const qty=parseInt(readlineSync.question("Số lượng: "));
                    order.addItem(p,qty);
                }
                store.createOrder(order);
                break;
            case "2":
                store.listOrders();
                break;
            case "3":
                const oidc=parseInt(readlineSync.question("ID đơn cần huỷ: "));
                store.cancelOrder(oidc);
                break;
            case "4": back=true; break;
            default: console.log("❌ Không hợp lệ.");
        }
    }
}

// =========================
// FUNCTION THỐNG KÊ
// =========================
function showStats(store: FashionStore){
    console.log("\n--- Thống kê ---");
    console.log("Tổng sản phẩm:", store.totalProducts());
    console.log("Tổng đơn hàng:", store.totalOrders());
    console.log("Doanh thu (Đã giao):", store.getRevenue());
}

// =========================
// CHẠY MENU
// =========================
menu();
