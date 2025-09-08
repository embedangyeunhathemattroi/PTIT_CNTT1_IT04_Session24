// Lớp Customer
class Customer {
    constructor(name, email, shippingAddress) {
        this.id = Customer.autoId++; // Gán ID và tự tăng cho lần tiếp theo
        this.name = name; // Lưu tên khách hàng
        this.email = email; // Lưu email khách hàng
        this.shippingAddress = shippingAddress; // Lưu địa chỉ giao hàng
    }
    // Phương thức lấy thông tin khách hàng dưới dạng chuỗi
    getDetails() {
        return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Address: ${this.shippingAddress}`;
    }
}
Customer.autoId = 1; // Biến static dùng để tự động tăng ID cho mỗi khách hàng mới
// Lớp Product (Abstract) - lớp trừu tượng
class Product {
    constructor(name, price, stock) {
        this.id = Product.autoId++; // Tự tăng ID
        this.name = name; // Lưu tên sản phẩm
        this.price = price; // Lưu giá sản phẩm
        this.stock = stock; // Lưu số lượng tồn
    }
    // Giảm số lượng tồn khi bán hàng
    sell(quantity) {
        if (quantity > this.stock) { // Nếu số lượng bán > tồn kho
            console.log(`Không đủ sản phẩm ${this.name}`);
        }
        else {
            this.stock -= quantity; // Trừ số lượng tồn
        }
    }
    // Tăng số lượng tồn kho
    restock(quantity) {
        this.stock += quantity;
    }
}
Product.autoId = 1; // Biến static để tự động tăng ID sản phẩm
// ElectronicsProduct - sản phẩm điện tử
class ElectronicsProduct extends Product {
    constructor(name, price, stock, warrantyPeriod) {
        super(name, price, stock); // Gọi constructor lớp cha Product
        this.warrantyPeriod = warrantyPeriod; // Lưu thời gian bảo hành
    }
    // Trả về thông tin sản phẩm điện tử
    getProductInfo() {
        return `ID: ${this.id}, Name: ${this.name}, Price: ${this.price}, Stock: ${this.stock}, Warranty: ${this.warrantyPeriod} months`;
    }
    // Phí ship cố định cho điện tử
    getShippingCost(distance) {
        return 50000;
    }
    //-Thông tin sản phẩm bao gồm cả thời gian bảo hành.
    getCategory() {
        return `Electronics - Warranty: ${this.warrantyPeriod} months`;
    }
}
// ClothingProduct - sản phẩm quần áo
class ClothingProduct extends Product {
    constructor(name, price, stock, size, color) {
        super(name, price, stock); // Gọi constructor lớp cha
        this.size = size; // Lưu size
        this.color = color; // Lưu màu
    }
    // Trả về thông tin sản phẩm quần áo
    getProductInfo() {
        return `ID: ${this.id}, Name: ${this.name}, Price: ${this.price}, Stock: ${this.stock}, Size: ${this.size}, Color: ${this.color}`;
    }
    // Phí ship cho quần áo
    getShippingCost(distance) {
        return 25000;
    }
    // Danh mục sản phẩm (bao gồm cả size và màu sắc)
    getCategory() {
        return `Clothing - Size: ${this.size}, Color: ${this.color}`;
    }
}
// Lớp Order - đơn hàng
class Order {
    constructor(customer, products) {
        this.orderId = Order.autoOrderId++; // Tự tăng mã đơn hàng
        this.customer = customer; // Lưu thông tin khách hàng
        this.products = products; // Lưu danh sách sản phẩm
        // Tính tổng tiền = sum(product.price * quantity)
        this.totalAmount = products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    }
    // Lấy thông tin chi tiết đơn hàng
    getDetails() {
        const productList = this.products.map(p => `${p.product.name} x${p.quantity}`).join(", ");
        return `Order ID: ${this.orderId}, Customer: ${this.customer.name}, Products: [${productList}], Total: ${this.totalAmount}`;
    }
}
Order.autoOrderId = 1; // Tự động tăng ID đơn hàng
// Lớp Store - quản lý toàn bộ hệ thống
class Store {
    constructor() {
        this.products = []; // Danh sách sản phẩm
        this.customers = []; // Danh sách khách hàng
        this.orders = []; // Danh sách đơn hàng
    }
    // Thêm khách hàng mới
    addCustomer(name, email, address) {
        this.customers.push(new Customer(name, email, address));
        alert("Đã thêm khách hàng thành công!");
    }
    // Thêm sản phẩm mới
    addProduct(product) {
        this.products.push(product);
        alert("Đã thêm sản phẩm thành công!");
    }
    // Hủy đơn hàng
    cancelOrder(orderId) {
        const index = this.orders.findIndex(o => o.orderId === orderId);
        if (index === -1) {
            alert("Order not found!");
            return;
        }
        // Hoàn trả hàng về kho
        this.orders[index].products.forEach(p => p.product.restock(p.quantity));
        this.orders.splice(index, 1); // Xóa đơn hàng
        alert("Đã hủy đơn hàng và hoàn trả sản phẩm!");
    }
    // Hiển thị sản phẩm còn hàng
    listAvailableProducts() {
        const available = this.products.filter(p => p.stock > 0);
        if (available.length === 0) {
            alert("Không có sản phẩm còn hàng");
            return;
        }
        available.forEach(p => console.log(p.getProductInfo()));
    }
    // Hiển thị đơn hàng của một khách hàng
    listCustomerOrders(customerId) {
        const customerOrders = this.orders.filter(o => o.customer.id === customerId);
        if (customerOrders.length === 0) {
            alert("Không có đơn hàng cho khách hàng này");
            return;
        }
        customerOrders.forEach(o => console.log(o.getDetails()));
    }
    // Tính tổng doanh thu
    calculateTotalRevenue() {
        return this.orders.reduce((sum, o) => sum + o.totalAmount, 0);
    }
    // Thống kê sản phẩm theo danh mục
    countProductsByCategory() {
        const counts = this.products.reduce((acc, p) => {
            const cat = p.getCategory();
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
        }, {});
        console.log("Thống kê sản phẩm theo danh mục:", counts);
    }
    // Cập nhật tồn kho
    updateProductStock(productId, newStock) {
        const index = this.products.findIndex(p => p.id === productId);
        if (index === -1) {
            alert("Product not found!");
            return;
        }
        this.products[index].stock = newStock;
        alert(`Cập nhật tồn kho cho sản phẩm ${this.products[index].name}`);
    }
    // Tìm theo ID (cho cả Customer hoặc Product)
    findById(id, arr) {
        return arr.find(x => x.id === id);
    }
    // Tạo đơn hàng mới K
    createOrder(customerId, items) {
        const customer = this.customers.find(c => c.id === customerId); // Tìm khách hàng
        if (!customer) {
            alert("Customer not found");
            return null;
        }
        const orderProducts = [];
        items.forEach(item => {
            const product = this.products.find(p => p.id === item.productId); // Tìm sản phẩm
            if (product && product.stock >= item.quantity) {
                product.sell(item.quantity); // Giảm tồn kho
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
        this.orders.push(order); // Lưu đơn hàng
        alert("Tạo đơn hàng thành công!");
        return order;
    }
}
// Menu tương tác
const store = new Store(); // Tạo một cửa hàng mới
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
            break; // Nếu nhấn Cancel thì thoát
        switch (choice) {
            case "1": { // Thêm khách hàng
                const name = prompt("Tên khách hàng:");
                const email = prompt("Email:");
                const address = prompt("Địa chỉ:");
                if (name && email && address)
                    store.addCustomer(name, email, address);
                break;
            }
            case "2": { // Thêm sản phẩm
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
            case "3": { // Tạo đơn hàng
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
            case "4": { // Hủy đơn hàng
                const oidStr = prompt("Order ID hủy:");
                if (!oidStr)
                    break;
                store.cancelOrder(parseInt(oidStr));
                break;
            }
            case "5":
                store.listAvailableProducts();
                break; // Sản phẩm còn hàng
            case "6": { // Xem đơn hàng của khách
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
                break; // Thống kê sản phẩm
            case "9": { // Cập nhật tồn kho
                const pidStr = prompt("Product ID:");
                const newStockStr = prompt("Tồn kho mới:");
                if (!pidStr || !newStockStr)
                    break;
                store.updateProductStock(parseInt(pidStr), parseInt(newStockStr));
                break;
            }
            case "10": { // Tìm kiếm theo ID
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
            case "11": { // Xem chi tiết sản phẩm
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
            case "12":
                alert("thoat chuong trinh");
                return; // Thoát chương trình
            default: alert("Lựa chọn không hợp lệ");
        }
    }
}
mainMenu();
