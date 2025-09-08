// ====== QUẢN LÝ CỬA HÀNG THÚ CƯNG ======
// Class Customer
class Customer {
    constructor(name, email) {
        this.id = Customer.nextId++;
        this.name = name;
        this.email = email;
    }
    getDetails() {
        return `ID: ${this.id}, Name: ${this.name}, Email: ${this.email}`;
    }
}
Customer.nextId = 1;
// Abstract Class Pet
class Pet {
    constructor(name, price, stock) {
        this.id = Pet.nextId++;
        this.name = name;
        this.price = price;
        this.stock = stock;
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
Pet.nextId = 1;
// Class Dog
class Dog extends Pet {
    constructor(name, price, stock, breed, age) {
        super(name, price, stock);
        this.breed = breed;
        this.age = age;
    }
    getPetInfo() {
        return `Dog - ${this.name} | Breed: ${this.breed} | Age: ${this.age} | Price: ${this.price} | Stock: ${this.stock}`;
    }
    getCategory() {
        return "Dog";
    }
}
// Class Cat
class Cat extends Pet {
    constructor(name, price, stock, color, gender) {
        super(name, price, stock);
        this.color = color;
        this.gender = gender;
    }
    getPetInfo() {
        return `Cat - ${this.name} | Color: ${this.color} | Gender: ${this.gender} | Price: ${this.price} | Stock: ${this.stock}`;
    }
    getCategory() {
        return "Cat";
    }
}
// Class Order
class Order {
    constructor(customer, items) {
        this.orderId = Order.nextOrderId++;
        this.customer = customer;
        this.items = items;
        this.totalAmount = items.reduce((sum, i) => sum + i.pet.price * i.quantity, 0);
    }
    getDetails() {
        const list = this.items.map(i => `${i.pet.name} x${i.quantity}`).join(", ");
        return `Order[ID=${this.orderId}] Customer=${this.customer.name}, Items=[${list}], Total=${this.totalAmount}`;
    }
}
Order.nextOrderId = 1;
// Class PetStore
class PetStore {
    constructor() {
        this.customers = [];
        this.pets = [];
        this.orders = [];
    }
    addCustomer(name, email) {
        this.customers.push(new Customer(name, email));
        alert("Đã thêm khách hàng!");
    }
    addDog(name, price, stock, breed, age) {
        this.pets.push(new Dog(name, price, stock, breed, age));
        alert("Đã thêm Dog!");
    }
    addCat(name, price, stock, color, gender) {
        this.pets.push(new Cat(name, price, stock, color, gender));
        alert("Đã thêm Cat!");
    }
    createOrder(customerId, items) {
        const customer = this.findById(customerId, this.customers);
        if (!customer) {
            alert("Không tìm thấy khách hàng!");
            return;
        }
        const validItems = [];
        for (let it of items) {
            const pet = this.findById(it.petId, this.pets);
            if (!pet) {
                alert(`Không tìm thấy Pet ID=${it.petId}`);
            }
            if (!pet.sell(it.quantity)) {
                alert(`Pet ${pet.name} không đủ số lượng`);
            }
            validItems.push({ pet, quantity: it.quantity });
        }
        if (validItems.length === 0) {
            alert("Không có thú cưng hợp lệ!");
            return;
        }
        this.orders.push(new Order(customer, validItems));
        alert("Đặt thú cưng thành công!");
    }
    cancelOrder(orderId) {
        const idx = this.orders.findIndex(o => o.orderId === orderId);
        if (idx === -1) {
            alert("Không tìm thấy đơn!");
            return;
        }
        this.orders[idx].items.forEach(i => i.pet.restock(i.quantity));
        this.orders.splice(idx, 1);
        alert("Đã hủy đơn!");
    }
    listAvailablePets() {
        const list = this.pets.filter(p => p.stock > 0);
        console.log("Thú cưng còn hàng:");
        list.forEach(p => console.log(p.getPetInfo()));
    }
    listCustomerOrders(customerId) {
        const orders = this.orders.filter(o => o.customer.id === customerId);
        console.log(`Đơn của khách ID ${customerId}:`);
        orders.forEach(o => console.log(o.getDetails()));
    }
    calculateTotalRevenue() {
        return this.orders.reduce((sum, o) => sum + o.totalAmount, 0);
    }
    countPetsByCategory() {
        const counts = this.pets.reduce((acc, p) => {
            const cat = p.getCategory();
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
        }, {});
        console.log("Số lượng thú theo loài:", counts);
    }
    updatePetStock(petId, newStock) {
        const pet = this.findById(petId, this.pets);
        if (!pet) {
            alert("Không tìm thấy Pet!");
            return;
        }
        pet.stock = newStock;
        alert("Đã cập nhật tồn kho!");
    }
    getPetInfo(petId) {
        const pet = this.findById(petId, this.pets);
        return pet ? pet.getPetInfo() : "Không tìm thấy Pet";
    }
    findById(id, arr) {
        return arr.find(item => item.id === id);
    }
}
// ===== MENU =====
const store = new PetStore();
while (true) {
    const choice = prompt(`
===== MENU PETSTORE =====
1. Thêm khách hàng
2. Thêm thú cưng (Dog/Cat)
3. Đặt mua thú cưng
4. Hủy đơn hàng
5. Hiển thị thú còn hàng
6. Hiển thị đơn hàng của khách
7. Tính tổng doanh thu
8. Thống kê thú theo loài
9. Cập nhật tồn kho
10. Tìm kiếm khách hàng hoặc thú theo ID
11. Xem thông tin chi tiết thú
12. Thoát
Chọn:
    `);
    if (!choice)
        break;
    switch (choice) {
        case "1":
            const name = prompt("Tên khách hàng:");
            const email = prompt("Email:");
            if (name && email)
                store.addCustomer(name, email);
            break;
        case "2":
            const type = prompt("Loại (1: Dog, 2: Cat):");
            const petName = prompt("Tên thú cưng:");
            const priceStr = prompt("Giá:");
            const stockStr = prompt("Số lượng:");
            if (!petName || !priceStr || !stockStr)
                break;
            const price = parseFloat(priceStr);
            const stock = parseInt(stockStr);
            if (type === "1") {
                const breed = prompt("Giống:");
                const ageStr = prompt("Tuổi:");
                if (!breed || !ageStr)
                    break;
                store.addDog(petName, price, stock, breed, parseInt(ageStr));
            }
            else if (type === "2") {
                const color = prompt("Màu lông:");
                const gender = prompt("Giới tính (Male/Female):");
                if (!color || !gender)
                    break;
                store.addCat(petName, price, stock, color, gender);
            }
            break;
        case "3":
            const custIdStr = prompt("Customer ID:");
            const nStr = prompt("Số loại thú muốn mua:");
            if (!custIdStr || !nStr)
                break;
            const n = parseInt(nStr);
            const items = [];
            for (let i = 0; i < n; i++) {
                const petIdStr = prompt(`Pet ID #${i + 1}:`);
                const qtyStr = prompt("Số lượng:");
                if (!petIdStr || !qtyStr)
                    continue;
                items.push({ petId: parseInt(petIdStr), quantity: parseInt(qtyStr) });
            }
            store.createOrder(parseInt(custIdStr), items);
            break;
        case "4":
            const orderIdStr = prompt("Order ID hủy:");
            if (!orderIdStr)
                break;
            store.cancelOrder(parseInt(orderIdStr));
            break;
        case "5":
            store.listAvailablePets();
            break;
        case "6":
            const custId2Str = prompt("Customer ID:");
            if (!custId2Str)
                break;
            store.listCustomerOrders(parseInt(custId2Str));
            break;
        case "7":
            alert("Tổng doanh thu: " + store.calculateTotalRevenue());
            break;
        case "8":
            store.countPetsByCategory();
            break;
        case "9":
            const petIdStr2 = prompt("Pet ID:");
            const newStockStr = prompt("Số lượng mới:");
            if (!petIdStr2 || !newStockStr)
                break;
            store.updatePetStock(parseInt(petIdStr2), parseInt(newStockStr));
            break;
        case "10":
            const searchType = prompt("Tìm (1: Customer, 2: Pet):");
            const idStr = prompt("Nhập ID:");
            if (!searchType || !idStr)
                break;
            const id = parseInt(idStr);
            if (searchType === "1") {
                const cust = store.findById(id, store.customers);
                alert(cust ? cust.getDetails() : "Không tìm thấy khách hàng");
            }
            else if (searchType === "2") {
                alert(store.getPetInfo(id));
            }
            break;
        case "11":
            const petIdDetStr = prompt("Pet ID xem chi tiết:");
            if (!petIdDetStr)
                break;
            alert(store.getPetInfo(parseInt(petIdDetStr)));
            break;
        case "12":
            alert("Thoát chương trình");
            break;
        default:
            alert("Lựa chọn không hợp lệ");
    }
}
