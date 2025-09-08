// =========================
// Lớp Customer
// =========================
class Customer {
    constructor(name, email, shippingAddress) {
        this.id = Customer.autoId++;
        this.name = name;
        this.email = email;
        this.shippingAddress = shippingAddress;
    }
    getDetails() {
        return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Address: ${this.shippingAddress}`;
    }
}
Customer.autoId = 1;
// =========================
// Lớp Product (Abstract)
// =========================
class Product {
    constructor(name, price, stock) {
        this.id = Product.autoId++;
        this.name = name;
        this.price = price;
        this.stock = stock;
    }
    sell(quantity) {
        if (quantity > this.stock) {
            console.log(`Không đủ sản phẩm ${this.name}`);
        }
        else {
            this.stock -= quantity;
        }
    }
    restock(quantity) {
        this.stock += quantity;
    }
}
Product.autoId = 1;
// =========================
// ElectronicsProduct
// =========================
class ElectronicsProduct extends Product {
    constructor(name, price, stock, warrantyPeriod) {
        super(name, price, stock);
        this.warrantyPeriod = warrantyPeriod;
    }
    getProductInfo() {
        return `ID: ${this.id}, Name: ${this.name}, Price: ${this.price}, Stock: ${this.stock}, Warranty: ${this.warrantyPeriod} months`;
    }
    getShippingCost(distance) {
        return 50000;
    }
    getCategory() {
        return "Electronics";
    }
}
// =========================
// ClothingProduct
// =========================
class ClothingProduct extends Product {
    constructor(name, price, stock, size, color) {
        super(name, price, stock);
        this.size = size;
        this.color = color;
    }
    getProductInfo() {
        return `ID: ${this.id}, Name: ${this.name}, Price: ${this.price}, Stock: ${this.stock}, Size: ${this.size}, Color: ${this.color}`;
    }
    getShippingCost(distance) {
        return 25000;
    }
    getCategory() {
        return "Clothing";
    }
}
// =========================
// Lớp Order
// =========================
class Order {
    constructor(customer, products) {
        this.orderId = Order.autoOrderId++;
        this.customer = customer;
        this.products = products;
        this.totalAmount = products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    }
    getDetails() {
        const productList = this.products.map(p => `${p.product.name} x${p.quantity}`).join(", ");
        return `Order ID: ${this.orderId}, Customer: ${this.customer.name}, Products: [${productList}], Total: ${this.totalAmount}`;
    }
}
Order.autoOrderId = 1;
// =========================
// Lớp Store
// =========================
class Store {
    constructor() {
        this.products = [];
        this.customers = [];
        this.orders = [];
    }
    addCustomer(name, email, address) {
        this.customers.push(new Customer(name, email, address));
        alert("Đã thêm khách hàng thành công!");
    }
    addProduct(product) {
        this.products.push(product);
        alert("Đã thêm sản phẩm thành công!");
    }
    createOrder(customerId, items) {
        const customer = this.customers.find(c => c.id === customerId);
        if (!customer) {
            alert("Customer not found");
            return null;
        }
        const orderProducts = [];
        items.forEach(item => {
            const product = this.products.find(p => p.id === item.productId);
            if (product && product.stock >= item.quantity) {
                product.sell(item.quantity);
                orderProducts.push({ product, quantity: item.quantity });
            }
            else if (product) {
                alert(`Không đủ sản phẩm ${product.name}`);
            }
        });
        if (orderProducts.length === 0) {
            alert("Không có sản phẩm để đặt!");
            return null;
        }
        const order = new Order(customer, orderProducts);
        this.orders.push(order);
        alert("Tạo đơn hàng thành công!");
        return order;
    }
    cancelOrder(orderId) {
        const index = this.orders.findIndex(o => o.orderId === orderId);
        if (index === -1) {
            alert("Order not found!");
            return;
        }
        this.orders[index].products.forEach(p => p.product.restock(p.quantity));
        this.orders.splice(index, 1);
        alert("Đã hủy đơn hàng và hoàn trả sản phẩm!");
    }
    listAvailableProducts() {
        const available = this.products.filter(p => p.stock > 0);
        if (available.length === 0) {
            alert("Không có sản phẩm còn hàng");
            return;
        }
        available.forEach(p => console.log(p.getProductInfo()));
    }
    listCustomerOrders(customerId) {
        const customerOrders = this.orders.filter(o => o.customer.id === customerId);
        if (customerOrders.length === 0) {
            alert("Không có đơn hàng cho khách hàng này");
            return;
        }
        customerOrders.forEach(o => console.log(o.getDetails()));
    }
    calculateTotalRevenue() {
        return this.orders.reduce((sum, o) => sum + o.totalAmount, 0);
    }
    countProductsByCategory() {
        const counts = this.products.reduce((acc, p) => {
            const cat = p.getCategory();
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
        }, {});
        console.log("Thống kê sản phẩm theo danh mục:", counts);
    }
    updateProductStock(productId, newStock) {
        const index = this.products.findIndex(p => p.id === productId);
        if (index === -1) {
            alert("Product not found!");
            return;
        }
        this.products[index].stock = newStock;
        alert(`Cập nhật tồn kho cho sản phẩm ${this.products[index].name}`);
    }
    findById(id, arr) {
        return arr.find(x => x.id === id);
    }
}
// =========================
// Menu tương tác
// =========================
const store = new Store();
function mainMenu() {
    while (true) {
        const choice = prompt(`
1. Thêm khách hàng mới
2. Thêm sản phẩm mới
3. Tạo đơn hàng
4. Hủy đơn hàng
5. Hiển thị sản phẩm còn hàng
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
            case "1": {
                const name = prompt("Tên khách hàng:");
                const email = prompt("Email:");
                const address = prompt("Địa chỉ:");
                if (name && email && address)
                    store.addCustomer(name, email, address);
                break;
            }
            case "2": {
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
                    store.addProduct(new ElectronicsProduct(pname, price, stock, parseInt(warrantyStr)));
                }
                else if (type === "2") {
                    const size = prompt("Size:");
                    const color = prompt("Màu:");
                    if (!size || !color)
                        break;
                    store.addProduct(new ClothingProduct(pname, price, stock, size, color));
                }
                break;
            }
            case "3": {
                const custIdStr = prompt("Customer ID:");
                if (!custIdStr)
                    break;
                const custId = parseInt(custIdStr);
                const nStr = prompt("Số loại sản phẩm trong đơn:");
                if (!nStr)
                    break;
                const n = parseInt(nStr);
                const items = [];
                for (let i = 0; i < n; i++) {
                    const pidStr = prompt(`Product ${i + 1} ID:`);
                    const qtyStr = prompt("Số lượng:");
                    if (!pidStr || !qtyStr)
                        continue;
                    items.push({ productId: parseInt(pidStr), quantity: parseInt(qtyStr) });
                }
                store.createOrder(custId, items);
                break;
            }
            case "4": {
                const oidStr = prompt("Order ID hủy:");
                if (!oidStr)
                    break;
                store.cancelOrder(parseInt(oidStr));
                break;
            }
            case "5":
                store.listAvailableProducts();
                break;
            case "6": {
                const cidStr = prompt("Customer ID:");
                if (!cidStr)
                    break;
                store.listCustomerOrders(parseInt(cidStr));
                break;
            }
            case "7":
                alert("Tổng doanh thu: " + store.calculateTotalRevenue());
                break;
            case "8":
                store.countProductsByCategory();
                break;
            case "9": {
                const pidStr = prompt("Product ID:");
                const newStockStr = prompt("Tồn kho mới:");
                if (!pidStr || !newStockStr)
                    break;
                store.updateProductStock(parseInt(pidStr), parseInt(newStockStr));
                break;
            }
            case "10": {
                const type = prompt("Tìm (1: Customer, 2: Product):");
                const idStr = prompt("Nhập ID:");
                if (!type || !idStr)
                    break;
                const id = parseInt(idStr);
                if (type === "1") {
                    const cust = store.findById(id, store.customers);
                    alert(cust ? cust.getDetails() : "Không tìm thấy khách hàng");
                }
                else {
                    const prod = store.findById(id, store.products);
                    alert(prod ? prod.getProductInfo() : "Không tìm thấy sản phẩm");
                }
                break;
            }
            case "11": {
                const pidStr = prompt("Product ID xem chi tiết:");
                if (!pidStr)
                    break;
                const prod = store.findById(parseInt(pidStr), store.products);
                if (prod)
                    alert(prod.getProductInfo());
                else
                    alert("Không tìm thấy sản phẩm");
                break;
            }
            case "12": return;
            default: alert("Lựa chọn không hợp lệ");
        }
    }
}
// Chạy menu
mainMenu();
