class DataStore {
    constructor() {
        this.data = [];
    }
    // Phương thức add: Thêm phần tử kiểu T vào danh sách
    add(item) {
        this.data.push(item);
    }
    // Phương thức getAll: Lấy toàn bộ danh sách
    getAll() {
        return this.data;
    }
    // Phương thức remove: Xóa phần tử tại vị trí index (nếu hợp lệ)
    remove(index) {
        if (index >= 0 && index < this.data.length) {
            this.data.splice(index, 1);
        }
        else {
            console.log(` Vị trí index ${index} không hợp lệ!`);
        }
    }
}
// 1. DataStore lưu trữ số
const numberStore = new DataStore();
numberStore.add(10);
numberStore.add(20);
numberStore.add(30);
console.log(" Danh sách số:", numberStore.getAll());
numberStore.remove(1);
console.log(" Sau khi xóa index 1:", numberStore.getAll());
// 2. DataStore lưu trữ chuỗi
const stringStore = new DataStore();
stringStore.add("Apple");
stringStore.add("Banana");
stringStore.add("Cherry");
console.log(" Danh sách chuỗi:", stringStore.getAll());
const productStore = new DataStore();
productStore.add({ id: 1, name: "Laptop" });
productStore.add({ id: 2, name: "Mouse" });
console.log(" Danh sách sản phẩm:", productStore.getAll());
