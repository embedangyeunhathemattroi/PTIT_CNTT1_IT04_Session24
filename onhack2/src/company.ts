// Lớp NhanVien
class NhanVien {
    public id: number;
    public name: string;
    public position: string;
    public salary: number;
    public isActive: boolean;

    constructor(id: number, name: string, position: string, salary: number, isActive: boolean = true) {
        this.id = id;
        this.name = name;
        this.position = position;
        this.salary = salary;
        this.isActive = isActive;
    }

    public displayInfo(): void {
        console.log(`${this.id} - ${this.name} | ${this.position} | ${this.salary} VNĐ | ${this.isActive ? "Đang làm" : "Đã nghỉ"}`);
    }
}


// Lớp QuanLyNhanVien
class QuanLyNhanVien {
    private danhSach: NhanVien[] = [];

    public addNhanVien(nv: NhanVien): void {
        this.danhSach.push(nv);
        console.log(` Đã thêm nhân viên: ${nv.name}`);
    }

    public showDanhSach(): void {
        console.log("\n Danh sách nhân viên:");
        this.danhSach.forEach(nv => nv.displayInfo());
    }

    public timKiemTheoTen(keyword: string): void {
        const ketQua = this.danhSach.filter(nv => nv.name.toLowerCase().includes(keyword.toLowerCase()));
        console.log(`\n Kết quả tìm kiếm: "${keyword}"`);
        ketQua.forEach(nv => nv.displayInfo());
    }

    public capNhatNhanVien(id: number, position?: string, salary?: number): void {
        const nv = this.danhSach.find(nv => nv.id === id);
        if (nv) {
            if (position) nv.position = position;
            if (salary) nv.salary = salary;
            console.log(` Đã cập nhật nhân viên: ${nv.name}`);
        } else {
            console.log(` Không tìm thấy nhân viên với ID: ${id}`);
        }
    }

    public xoaNhanVien(id: number): void {
        const index = this.danhSach.findIndex(nv => nv.id === id);
        if (index !== -1) {
            console.log(` Đã xóa nhân viên: ${this.danhSach[index].name}`);
            this.danhSach.splice(index, 1);
        } else {
            console.log(` Không tìm thấy nhân viên với ID: ${id}`);
        }
    }

    public tongLuong(): number {
        return this.danhSach.reduce((sum, nv) => sum + nv.salary, 0);
    }

    public locDangLam(): void {
        console.log("\n Nhân viên đang làm việc:");
        this.danhSach.filter(nv => nv.isActive).forEach(nv => nv.displayInfo());
    }
}

// ===============================
// Menu chức năng
// ===============================
const ql = new QuanLyNhanVien();

while (true) {
    const choice = prompt(
`===== QUẢN LÝ NHÂN VIÊN =====
1. Thêm nhân viên
2. Hiển thị danh sách
3. Tìm kiếm nhân viên theo tên
4. Cập nhật nhân viên
5. Xóa nhân viên
6. Tính tổng lương
7. Lọc nhân viên đang làm việc
0. Thoát
Chọn:`)!;

    switch (choice) {
        case "1": {
            const id = parseInt(prompt("ID nhân viên:")!);
            const name = prompt("Tên nhân viên:")!;
            const position = prompt("Chức vụ:")!;
            const salary = parseInt(prompt("Lương:")!);
            const isActiveInput = prompt("Đang làm việc? (y/n):")!;
            const isActive = isActiveInput.toLowerCase() === "y";
            ql.addNhanVien(new NhanVien(id, name, position, salary, isActive));
            break;
        }
        case "2":
            ql.showDanhSach();
            break;
        case "3": {
            const keyword = prompt("Nhập tên nhân viên cần tìm:")!;
            ql.timKiemTheoTen(keyword);
            break;
        }
        case "4": {
            const id = parseInt(prompt("ID nhân viên cần cập nhật:")!);
            const position = prompt("Chức vụ mới (bỏ trống nếu không thay đổi):")!;
            const salaryInput = prompt("Lương mới (bỏ trống nếu không thay đổi):")!;
            const salary = salaryInput ? parseInt(salaryInput) : undefined;
            ql.capNhatNhanVien(id, position || undefined, salary);
            break;
        }
        case "5": {
            const id = parseInt(prompt("ID nhân viên cần xóa:")!);
            ql.xoaNhanVien(id);
            break;
        }
        case "6":
            console.log(`\nTổng lương: ${ql.tongLuong()} VNĐ`);
            break;
        case "7":
            ql.locDangLam();
            break;
        case "0":
            console.log("Kết thúc chương trình");
           break;
        default:
            console.log(" Lựa chọn không hợp lệ");
    }
}
