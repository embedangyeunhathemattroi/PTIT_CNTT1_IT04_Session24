// =======================
// Lớp Customer
// =======================
class Customer {
    constructor(name, email, shippingAddress) {
        this.id = Customer.autoId++; // gán ID tự động
        this.name = name;
        this.email = email;
        this.shippingAddress = shippingAddress;
    }
    // In ra thông tin chi tiết khách hàng
    getDetails() {
        return `Tên: ${this.name}, ID: ${this.id}, Email: ${this.email}, Địa chỉ: ${this.shippingAddress}`;
    }
}
Customer.autoId = 1; // ID tự động tăng
// =======================
// Lớp Product (Abstract)
// =======================
class Product {
    constructor(name, price, stock) {
        this.id = Product.autoId++;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
    // Bán sản phẩm, giảm stock
    sell(quantity) {
        if (quantity > this.stock) {
            console.log(`Không đủ sản phẩm ${this.name}`);
        }
        else {
            this.stock -= quantity;
            console.log(`da them san pham `);
        }
    }
    // Nhập thêm sản phẩm, tăng stock
    restock(quantity) {
        this.stock += quantity;
    }
}
Product.autoId = 1; // ID tự động tăng
// =======================
// Lớp ElectronicsProduct kế thừa Product
// =======================
class ElectronicsProduct extends Product {
    constructor(name, price, stock, warrantyPeriod) {
        super(name, price, stock); // Gọi constructor lớp cha Product
        this.warrantyPeriod = warrantyPeriod;
    }
    // In thông tin sản phẩm điện tử
    getProductInfo() {
        return `Sản phẩm: ${this.name}, ID: ${this.id}, Giá: ${this.price}, Bảo hành: ${this.warrantyPeriod} tháng, Tồn kho: ${this.stock}`;
    }
    // Phí vận chuyển cố định
    getShippingCost(distance) {
        return 50000;
    }
    // Trả về danh mục sản phẩm
    getCategory() {
        return "electronic";
    }
}
// =======================
// Lớp ClothingProduct kế thừa Product
// =======================
class ClothingProduct extends Product {
    constructor(name, price, stock, size, color) {
        super(name, price, stock); // Gọi constructor lớp cha Product
        this.size = size;
        this.color = color;
    }
    // In thông tin sản phẩm quần áo
    getProductInfo() {
        return `Sản phẩm: ${this.name}, ID: ${this.id}, Giá: ${this.price}, Size: ${this.size}, Màu: ${this.color}, Tồn kho: ${this.stock}`;
    }
    // Phí vận chuyển cố định
    getShippingCost(distance) {
        return 25000;
    }
    // Trả về danh mục sản phẩm
    getCategory() {
        return "clothing";
    }
}
// =======================
// Lớp Order
// =======================
class Order {
    constructor(customer, products) {
        this.orderId = Order.autoOrderId++; // Tự động tăng ID đơn
        this.customer = customer;
        this.products = products;
        // Tính tổng tiền = giá * số lượng từng sản phẩm
        this.totalAmount = this.products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    }
    // In chi tiết đơn hàng
    getDetails() {
        const productDetails = this.products.map(p => `${p.product.name} x${p.quantity}`).join(", ");
        return `Order ID: ${this.orderId}, Khách: ${this.customer.name}, Sản phẩm: [${productDetails}], Tổng: ${this.totalAmount}`;
    }
}
Order.autoOrderId = 1; // ID đơn hàng tự tăng
// =======================
// Lớp Store: quản lý Products, Customers, Orders
// =======================
class Store {
    constructor(products, customers, orders) {
        this.products = products;
        this.customers = customers;
        this.orders = orders;
    }
    // Thêm sản phẩm vào cửa hàng
    addProduct(product) {
        this.products.push(product);
        alert("Đã thêm sản phẩm thành công!");
    }
    // Thêm khách hàng mới
    addCustomer(name, email, address) {
        const customer = new Customer(name, email, address);
        this.customers.push(customer);
        alert("Đã thêm khách hàng thành công!");
    }
    // Tạo đơn hàng
    createOrder(customerId, productQuantities) {
        const customer = this.customers.find(c => c.id === customerId); // Tìm khách
        if (!customer) {
            alert("Customer not found!");
            return null;
        }
        const orderProducts = [];
        // Duyệt từng sản phẩm trong đơn
        for (let pq of productQuantities) {
            const product = this.products.find(p => p.id === pq.productId); // Tìm sản phẩm
            if (!product) {
                alert(`Product ID ${pq.productId} not found!`);
                continue;
            }
            if (product.stock < pq.quantity) {
                alert(`Không đủ sản phẩm ${product.name}`);
                continue;
            }
            product.sell(pq.quantity); // Giảm stock
            orderProducts.push({ product, quantity: pq.quantity });
        }
        if (orderProducts.length === 0) {
            alert("Không có sản phẩm nào để tạo đơn hàng.");
            return null;
        }
        const order = new Order(customer, orderProducts); // Tạo đơn mới
        this.orders.push(order);
        alert("Order created successfully!");
        return order;
    }
    // Hủy đơn hàng
    cancelOrder(orderId) {
        const index = this.orders.findIndex(o => o.orderId === orderId);
        if (index === -1) {
            alert("Order not found!");
            return;
        }
        const order = this.orders[index];
        // Trả lại stock cho sản phẩm
        order.products.forEach(item => item.product.restock(item.quantity));
        this.orders.splice(index, 1);
        alert("Order cancelled and stock restored.");
    }
    // Liệt kê sản phẩm còn hàng
    listAvailableProducts() {
        const available = this.products.filter(p => p.stock > 0);
        console.log("Available Products:");
        available.forEach(p => console.log(p.getProductInfo()));
    }
    // Tính tổng doanh thu
    calculateTotalRevenue() {
        return this.orders.reduce((sum, o) => sum + o.totalAmount, 0);
    }
    // Liệt kê đơn hàng của 1 khách hàng
    listCustomerOrders(customerId) {
        const customerOrders = this.orders.filter(o => o.customer.id === customerId);
        console.log(`Orders for Customer ID ${customerId}:`);
        customerOrders.forEach(o => console.log(o.getDetails()));
    }
    // Thống kê số lượng sản phẩm theo danh mục
    countProductsByCategory() {
        const counts = this.products.reduce((acc, p) => {
            const category = p.getCategory();
            acc[category] = (acc[category] || 0) + 1;
            return acc;
        }, {});
        console.log("Product count by category:", counts);
    }
    // Cập nhật tồn kho sản phẩm
    updateProductStock(productId, newStock) {
        const index = this.products.findIndex(p => p.id === productId);
        if (index === -1) {
            alert("Product not found!");
            return;
        }
        this.products[index].stock = newStock;
        alert(`Stock updated for product ${this.products[index].name}`);
    }
    // Tìm Customer hoặc Product theo ID
    findById(id, arr) {
        return arr.find(item => item.id === id);
    }
}
// =======================
// Khởi tạo cửa hàng trống
// =======================
const store = new Store([], [], []);
// =======================
// Menu chính: vòng lặp chọn chức năng
// =======================
function mainMenu() {
    while (true) {
        const choice = prompt(`
1. Thêm khách hàng mới
2. Thêm sản phẩm mới (Đồ điện tử / Quần áo)
3. Tạo đơn hàng mới
4. Hủy đơn hàng
5. Hiển thị danh sách sản phẩm còn hàng
6. Hiển thị đơn hàng của khách hàng
7. Tính tổng doanh thu
8. Thống kê sản phẩm theo danh mục
9. Cập nhật tồn kho sản phẩm
10. Tìm kiếm Customer/Product theo ID
11. Xem chi tiết sản phẩm
12. Thoát
Chọn:`);
        if (!choice)
            break;
        switch (choice) {
            case "1":
                const name = prompt("Tên khách hàng:");
                const email = prompt("Email:");
                const address = prompt("Địa chỉ:");
                if (name && email && address)
                    store.addCustomer(name, email, address);
                break;
            case "2":
                const type = prompt("Loại sản phẩm (1: Điện tử, 2: Quần áo):");
                const pname = prompt("Tên sản phẩm:");
                const priceStr = prompt("Giá:");
                const stockStr = prompt("Số lượng:");
                if (!pname || !priceStr || !stockStr)
                    break;
                const price = parseFloat(priceStr);
                const stock = parseInt(stockStr);
                if (type === "1") {
                    const warrantyStr = prompt("Bảo hành (tháng):");
                    if (!warrantyStr)
                        break;
                    const warranty = parseInt(warrantyStr);
                    store.addProduct(new ElectronicsProduct(pname, price, stock, warranty));
                }
                else if (type === "2") {
                    const size = prompt("Size:");
                    const color = prompt("Màu:");
                    if (!size || !color)
                        break;
                    store.addProduct(new ClothingProduct(pname, price, stock, size, color));
                }
                break;
            case "3":
                const custIdStr = prompt("Customer ID:");
                if (!custIdStr)
                    break;
                const custId = parseInt(custIdStr);
                const nStr = prompt("Số loại sản phẩm trong đơn:");
                if (!nStr)
                    break;
                const n = parseInt(nStr);
                const products = [];
                for (let i = 0; i < n; i++) {
                    const pidStr = prompt(`Product ${i + 1} ID:`);
                    const qtyStr = prompt(`Số lượng:`);
                    if (!pidStr || !qtyStr)
                        continue;
                    products.push({ productId: parseInt(pidStr), quantity: parseInt(qtyStr) });
                }
                store.createOrder(custId, products);
                break;
            case "4":
                const oidStr = prompt("Order ID hủy:");
                if (!oidStr)
                    break;
                store.cancelOrder(parseInt(oidStr));
                break;
            case "5":
                store.listAvailableProducts();
                break;
            case "6":
                const cidStr = prompt("Customer ID:");
                if (!cidStr)
                    break;
                store.listCustomerOrders(parseInt(cidStr));
                break;
            case "7":
                alert("Tổng doanh thu: " + store.calculateTotalRevenue());
                break;
            case "8":
                store.countProductsByCategory();
                break;
            case "9":
                const pidStr = prompt("Product ID:");
                const newStockStr = prompt("Tồn kho mới:");
                if (!pidStr || !newStockStr)
                    break;
                store.updateProductStock(parseInt(pidStr), parseInt(newStockStr));
                break;
            case "10":
                const searchType = prompt("Tìm (1: Customer, 2: Product):");
                const idStr = prompt("Nhập ID:");
                if (!searchType || !idStr)
                    break;
                const id = parseInt(idStr);
                if (searchType === "1") {
                    const cust = store.findById(id, store.customers);
                    alert(cust ? cust.getDetails() : "Không tìm thấy khách hàng");
                }
                else if (searchType === "2") {
                    const prod = store.findById(id, store.products);
                    alert(prod ? prod.getProductInfo() : "Không tìm thấy sản phẩm");
                }
                break;
            case "11":
                const pidDetStr = prompt("Product ID xem chi tiết:");
                if (!pidDetStr)
                    break;
                const prodDet = store.findById(parseInt(pidDetStr), store.products);
                if (prodDet)
                    alert(prodDet.getProductInfo());
                else
                    alert("Không tìm thấy sản phẩm");
                break;
            case "12":
                alert("Thoát chương trình");
                return;
            default:
                alert("Lựa chọn không hợp lệ");
        }
    }
}
mainMenu();
