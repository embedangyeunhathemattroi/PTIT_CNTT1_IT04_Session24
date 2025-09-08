// pet-store.ts
// Chạy: tsc pet-store.ts && node pet-store.js
// =============================
// Class Pet
// =============================
class Pet {
    constructor(id, name, type, age, price, status // "Còn hàng" | "Đã bán"
    ) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.age = age;
        this.price = price;
        this.status = status;
    }
    displayInfo() {
        console.log(`ID: ${this.id} | Tên: ${this.name} | Loại: ${this.type} | Tuổi: ${this.age} | Giá: ${this.price} | Tình trạng: ${this.status}`);
    }
}
// =============================
// Class Customer
// =============================
class Customer {
    constructor(id, name, phone, purchaseHistory = []) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.purchaseHistory = purchaseHistory;
    }
    displayInfo() {
        console.log(`ID: ${this.id} | Tên: ${this.name} | SĐT: ${this.phone}`);
        console.log("Lịch sử mua:");
        if (this.purchaseHistory.length === 0) {
            console.log(" - Chưa mua thú cưng nào");
        }
        else {
            this.purchaseHistory.forEach((petId) => {
                console.log(` - Mã thú: ${petId}`);
            });
        }
    }
}
// =============================
// Class PetStore
// =============================
class PetStore {
    constructor() {
        this.pets = [];
        this.customers = [];
    }
    // Thêm thú cưng mới (id không trùng)
    addPet(pet) {
        if (this.pets.some(p => p.id === pet.id)) {
            console.log(`❌ Thú cưng ID ${pet.id} đã tồn tại.`);
            return;
        }
        this.pets.push(pet);
        console.log(`✅ Đã thêm thú cưng ${pet.name}.`);
    }
    // Hiển thị tất cả thú cưng
    showAllPets() {
        console.log("\n📋 Danh sách thú cưng:");
        this.pets.forEach(p => p.displayInfo());
    }
    // Tìm kiếm thú cưng theo loại
    searchPetsByType(type) {
        const found = this.pets.filter(p => p.type.toLowerCase() === type.toLowerCase());
        if (found.length === 0) {
            console.log(`❌ Không tìm thấy thú loại '${type}'.`);
            return;
        }
        console.log(`📋 Kết quả tìm kiếm thú loại '${type}':`);
        found.forEach(p => p.displayInfo());
    }
    // Sắp xếp thú cưng theo giá
    sortPetsByPrice(asc = true) {
        this.pets.sort((a, b) => asc ? a.price - b.price : b.price - a.price);
        console.log(`📋 Danh sách thú cưng đã sắp xếp theo giá ${asc ? "tăng" : "giảm"}:`);
        this.showAllPets();
    }
    // Bán thú cưng
    sellPet(petId, customerId) {
        const pet = this.pets.find(p => p.id === petId);
        const customer = this.customers.find(c => c.id === customerId);
        if (!pet) {
            console.log(`❌ Không tìm thấy thú cưng ID ${petId}.`);
            return;
        }
        if (pet.status === "Đã bán") {
            console.log(`❌ Thú cưng ID ${petId} đã được bán.`);
            return;
        }
        if (!customer) {
            console.log(`❌ Không tìm thấy khách hàng ID ${customerId}.`);
            return;
        }
        pet.status = "Đã bán";
        customer.purchaseHistory.push(pet.id);
        console.log(`✅ Đã bán thú ${pet.name} cho khách ${customer.name}.`);
    }
    // Thêm khách hàng mới
    addCustomer(customer) {
        if (this.customers.some(c => c.id === customer.id)) {
            console.log(`❌ Khách hàng ID ${customer.id} đã tồn tại.`);
            return;
        }
        this.customers.push(customer);
        console.log(`✅ Đã thêm khách hàng ${customer.name}.`);
    }
    // Hiển thị tất cả khách hàng
    showAllCustomers() {
        console.log("\n📋 Danh sách khách hàng:");
        this.customers.forEach(c => c.displayInfo());
    }
    // Tìm khách hàng theo tên hoặc số điện thoại
    searchCustomer(keyword) {
        const found = this.customers.filter(c => c.name.toLowerCase().includes(keyword.toLowerCase()) || c.phone.includes(keyword));
        if (found.length === 0) {
            console.log(`❌ Không tìm thấy khách hàng '${keyword}'.`);
            return;
        }
        console.log(`📋 Kết quả tìm kiếm khách hàng '${keyword}':`);
        found.forEach(c => c.displayInfo());
    }
    // Thống kê
    statistics() {
        const availableCount = this.pets.filter(p => p.status === "Còn hàng").length;
        const soldPets = this.pets.filter(p => p.status === "Đã bán");
        const soldCount = soldPets.length;
        const revenue = soldPets.reduce((sum, pet) => sum + pet.price, 0);
        console.log("\n📊 Thống kê:");
        console.log(`- Số thú còn hàng: ${availableCount}`);
        console.log(`- Số thú đã bán: ${soldCount}`);
        console.log(`- Doanh thu: ${revenue}`);
    }
}
// =============================
// Demo chức năng
// =============================
const store = new PetStore();
// Thêm thú cưng
store.addPet(new Pet("P001", "Milu", "Chó", 2, 3000, "Còn hàng"));
store.addPet(new Pet("P002", "Tom", "Mèo", 1, 2000, "Còn hàng"));
store.addPet(new Pet("P003", "Jerry", "Chim", 1, 500, "Còn hàng"));
// Hiển thị thú cưng
store.showAllPets();
// Tìm kiếm theo loại
store.searchPetsByType("Mèo");
// Sắp xếp thú cưng theo giá giảm dần
store.sortPetsByPrice(false);
// Thêm khách hàng
store.addCustomer(new Customer("C001", "Nguyễn Văn A", "0901234567"));
store.addCustomer(new Customer("C002", "Trần Thị B", "0912345678"));
// Bán thú cưng
store.sellPet("P002", "C001");
// Hiển thị khách hàng
store.showAllCustomers();
// Tìm khách hàng
store.searchCustomer("Nguyễn");
// Thống kê
store.statistics();
