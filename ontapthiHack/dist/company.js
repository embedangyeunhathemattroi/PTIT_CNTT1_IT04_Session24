// ===============================
// Lớp NhanVien
// ===============================
class NhanVien {
    constructor(id, name, position, salary, isActive = true) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.salary = salary;
        this.isActive = isActive;
    }
    // Hiển thị thông tin nhân viên
    displayInfo() {
        console.log(`${this.id} - ${this.name} | ${this.position} | ${this.salary} VNĐ | ${this.isActive ? "Đang làm" : "Đã nghỉ"}`);
    }
}
// ===============================
// Lớp QuanLyNhanVien
// ===============================
class QuanLyNhanVien {
    constructor() {
        this.danhSach = [];
    }
    // 1. Thêm nhân viên mới
    addNhanVien(nv) {
        this.danhSach.push(nv);
        console.log(`✅ Đã thêm nhân viên: ${nv.name}`);
    }
    // 2. Hiển thị danh sách
    showDanhSach() {
        console.log("\n📋 Danh sách nhân viên:");
        this.danhSach.forEach(nv => nv.displayInfo());
    }
    // 3. Tìm kiếm nhân viên theo tên
    timKiemTheoTen(keyword) {
        const ketQua = this.danhSach.filter(nv => nv.name.toLowerCase().includes(keyword.toLowerCase()));
        console.log(`\n🔍 Kết quả tìm kiếm: "${keyword}"`);
        ketQua.forEach(nv => nv.displayInfo());
    }
    // 4. Cập nhật thông tin (vị trí hoặc lương)
    capNhatNhanVien(id, position, salary) {
        const nv = this.danhSach.find(nv => nv.id === id);
        if (nv) {
            if (position)
                nv.position = position;
            if (salary)
                nv.salary = salary;
            console.log(`✏️ Đã cập nhật nhân viên: ${nv.name}`);
        }
        else {
            console.log(`❌ Không tìm thấy nhân viên với ID: ${id}`);
        }
    }
    // 5. Xóa nhân viên
    xoaNhanVien(id) {
        this.danhSach = this.danhSach.filter(nv => nv.id !== id);
        console.log(`🗑️ Đã xóa nhân viên ID: ${id}`);
    }
    // 6. Tính tổng lương
    tongLuong() {
        return this.danhSach.reduce((sum, nv) => sum + nv.salary, 0);
    }
    // 7. Lọc nhân viên đang làm việc
    locDangLam() {
        console.log("\n👨‍💼 Nhân viên đang làm việc:");
        this.danhSach.filter(nv => nv.isActive).forEach(nv => nv.displayInfo());
    }
}
// ===============================
// Demo
// ===============================
const ql = new QuanLyNhanVien();
// Thêm nhân viên
ql.addNhanVien(new NhanVien(1, "Nguyễn Văn A", "Developer", 15000000));
ql.addNhanVien(new NhanVien(2, "Trần Thị B", "Designer", 12000000));
ql.addNhanVien(new NhanVien(3, "Lê Văn C", "Tester", 10000000, false));
// Hiển thị danh sách
ql.showDanhSach();
// Tìm kiếm nhân viên
ql.timKiemTheoTen("b");
// Cập nhật thông tin
ql.capNhatNhanVien(1, "Senior Developer", 20000000);
// Xóa nhân viên
ql.xoaNhanVien(3);
// Tính tổng lương
console.log(`\n💰 Tổng lương: ${ql.tongLuong()} VNĐ`);
// Lọc nhân viên đang làm việc
ql.locDangLam();
