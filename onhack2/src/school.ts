// ================================
// QUẢN LÝ LỚP HỌC NÂNG CAO
// ================================

class Student {
    constructor(
        public id: number,
        public name: string,
        public grade: number = 0
    ) {}
}

class Teacher {
    constructor(
        public id: number,
        public name: string,
        public subject: string
    ) {}
}

class Classroom {
    public students: Student[] = [];
    public teacher?: Teacher;

    constructor(public name: string) {}

    addStudent(student: Student) {
        this.students.push(student);
        console.log(`✅ Đã thêm học sinh ${student.name} vào lớp ${this.name}`);
    }

    removeStudent(studentId: number) {
        const idx = this.students.findIndex(s => s.id === studentId);
        if (idx >= 0) {
            const removed = this.students.splice(idx, 1)[0];
            console.log(`🗑️ Đã xóa học sinh ${removed.name}`);
        } else console.log("❌ Không tìm thấy học sinh.");
    }

    assignTeacher(teacher: Teacher) {
        this.teacher = teacher;
        console.log(`📚 Giáo viên ${teacher.name} được phân công cho lớp ${this.name}`);
    }

    removeTeacher() {
        if (this.teacher) {
            console.log(`🗑️ Hủy phân công giáo viên ${this.teacher.name}`);
            this.teacher = undefined;
        } else console.log("⚠️ Lớp chưa có giáo viên.");
    }

    updateGrade(studentId: number, grade: number) {
        const s = this.students.find(st => st.id === studentId);
        if (s) {
            s.grade = grade;
            console.log(`✅ Cập nhật điểm ${grade} cho ${s.name}`);
        } else console.log("❌ Không tìm thấy học sinh.");
    }

    findStudentByName(name: string) {
        const found = this.students.filter(s => s.name.toLowerCase().includes(name.toLowerCase()));
        if (found.length > 0) {
            console.log("🔍 Kết quả tìm kiếm theo tên:");
            found.forEach(s => console.log(`- ID=${s.id} | ${s.name} (Điểm: ${s.grade})`));
        } else console.log("❌ Không tìm thấy học sinh.");
    }

    findStudentByGrade(min: number, max: number) {
        const found = this.students.filter(s => s.grade >= min && s.grade <= max);
        if (found.length > 0) {
            console.log(`🔍 Học sinh có điểm từ ${min} đến ${max}:`);
            found.forEach(s => console.log(`- ID=${s.id} | ${s.name} (Điểm: ${s.grade})`));
        } else console.log("❌ Không có học sinh trong khoảng điểm này.");
    }

    stats() {
        if (this.students.length === 0) {
            console.log("⚠️ Lớp chưa có học sinh.");
            return;
        }
        const avg = this.students.reduce((sum, s) => sum + s.grade, 0) / this.students.length;
        const above8 = this.students.filter(s => s.grade >= 8).length;
        const below5 = this.students.filter(s => s.grade < 5).length;
        const maxGrade = Math.max(...this.students.map(s => s.grade));
        const minGrade = Math.min(...this.students.map(s => s.grade));
        console.log(`📊 Thống kê lớp ${this.name}:`);
        console.log(`- Điểm trung bình: ${avg.toFixed(2)}`);
        console.log(`- Học sinh >=8 điểm: ${above8}`);
        console.log(`- Học sinh <5 điểm: ${below5}`);
        console.log(`- Điểm cao nhất: ${maxGrade}`);
        console.log(`- Điểm thấp nhất: ${minGrade}`);
    }

    sortByGrade(desc: boolean = false) {
        this.students.sort((a, b) => desc ? b.grade - a.grade : a.grade - b.grade);
        console.log(`✅ Danh sách học sinh đã sắp xếp theo điểm ${desc ? "giảm dần" : "tăng dần"}`);
        this.showInfo();
    }

    showInfo() {
        console.log(`===== Thông tin lớp ${this.name} =====`);
        console.log(`Giáo viên: ${this.teacher ? `${this.teacher.name} (${this.teacher.subject})` : "Chưa có"}`);
        if (this.students.length === 0) console.log("Lớp chưa có học sinh.");
        else this.students.forEach(s => console.log(`- ID=${s.id} | ${s.name} (Điểm: ${s.grade})`));
    }
}

// ================================
// HỆ THỐNG QUẢN LÝ NHIỀU LỚP
// ================================
const classrooms: Classroom[] = [];
let studentIdCounter = 1;
let teacherIdCounter = 1;

while (true) {
    const choice = prompt(
`===== MENU QUẢN LÝ LỚP HỌC NÂNG CAO =====
1. Thêm lớp mới
2. Thêm học sinh
3. Xóa học sinh
4. Gán giáo viên
5. Hủy phân công giáo viên
6. Cập nhật điểm học sinh
7. Tìm học sinh theo tên
8. Tìm học sinh theo khoảng điểm
9. Thống kê lớp
10. Sắp xếp học sinh theo điểm
11. Hiển thị thông tin lớp
12. Thoát
Chọn:`
    );
    if (!choice) break;

    switch (choice) {
        case "1": {
            const name = prompt("Tên lớp mới:")!;
            classrooms.push(new Classroom(name));
            console.log(`✅ Đã thêm lớp ${name}`);
            break;
        }
        case "2": {
            if (classrooms.length === 0) { console.log("⚠️ Chưa có lớp nào."); break; }
            const clsName = prompt("Nhập tên lớp muốn thêm học sinh:")!;
            const cls = classrooms.find(c => c.name === clsName);
            if (!cls) { console.log("❌ Không tìm thấy lớp."); break; }
            const n = parseInt(prompt("Số học sinh muốn thêm:")!);
            for (let i = 0; i < n; i++) {
                const name = prompt(`Tên học sinh #${i+1}:`)!;
                const grade = parseFloat(prompt("Điểm:")!);
                if (isNaN(grade) || grade < 0 || grade > 10) { console.log("❌ Điểm không hợp lệ."); continue; }
                cls.addStudent(new Student(studentIdCounter++, name, grade));
            }
            break;
        }
        case "3": {
            const clsName = prompt("Tên lớp muốn xóa học sinh:")!;
            const cls = classrooms.find(c => c.name === clsName);
            if (!cls) { console.log("❌ Không tìm thấy lớp."); break; }
            const id = parseInt(prompt("ID học sinh cần xóa:")!);
            cls.removeStudent(id);
            break;
        }
        case "4": {
            if (classrooms.length === 0) { console.log("⚠️ Chưa có lớp nào."); break; }
            const clsName = prompt("Tên lớp muốn phân công giáo viên:")!;
            const cls = classrooms.find(c => c.name === clsName);
            if (!cls) { console.log("❌ Không tìm thấy lớp."); break; }
            const name = prompt("Tên giáo viên:")!;
            const subject = prompt("Môn dạy:")!;
            cls.assignTeacher(new Teacher(teacherIdCounter++, name, subject));
            break;
        }
        case "5": {
            const clsName = prompt("Tên lớp muốn hủy giáo viên:")!;
            const cls = classrooms.find(c => c.name === clsName);
            if (!cls) { console.log("❌ Không tìm thấy lớp."); break; }
            cls.removeTeacher();
            break;
        }
        case "6": {
            const clsName = prompt("Tên lớp:")!;
            const cls = classrooms.find(c => c.name === clsName);
            if (!cls) { console.log("❌ Không tìm thấy lớp."); break; }
            const id = parseInt(prompt("ID học sinh:")!);
            const grade = parseFloat(prompt("Điểm mới:")!);
            if (isNaN(grade) || grade < 0 || grade > 10) { console.log("❌ Điểm không hợp lệ."); break; }
            cls.updateGrade(id, grade);
            break;
        }
        case "7": {
            const clsName = prompt("Tên lớp:")!;
            const cls = classrooms.find(c => c.name === clsName);
            if (!cls) { console.log("❌ Không tìm thấy lớp."); break; }
            const name = prompt("Tên học sinh cần tìm:")!;
            cls.findStudentByName(name);
            break;
        }
        case "8": {
            const clsName = prompt("Tên lớp:")!;
            const cls = classrooms.find(c => c.name === clsName);
            if (!cls) { console.log("❌ Không tìm thấy lớp."); break; }
            const min = parseFloat(prompt("Điểm min:")!);
            const max = parseFloat(prompt("Điểm max:")!);
            cls.findStudentByGrade(min, max);
            break;
        }
        case "9": {
            const clsName = prompt("Tên lớp muốn thống kê:")!;
            const cls = classrooms.find(c => c.name === clsName);
            if (!cls) { console.log("❌ Không tìm thấy lớp."); break; }
            cls.stats();
            break;
        }
        case "10": {
            const clsName = prompt("Tên lớp muốn sắp xếp:")!;
            const cls = classrooms.find(c => c.name === clsName);
            if (!cls) { console.log("❌ Không tìm thấy lớp."); break; }
            const desc = prompt("Sắp xếp giảm dần? (y/n):") === "y";
            cls.sortByGrade(desc);
            break;
        }
        case "11": {
            const clsName = prompt("Tên lớp muốn hiển thị:")!;
            const cls = classrooms.find(c => c.name === clsName);
            if (!cls) { console.log("❌ Không tìm thấy lớp."); break; }
            cls.showInfo();
            break;
        }
        case "12": {
            alert("✅ Thoát chương trình");
            break;
        }
        default: console.log("❌ Lựa chọn không hợp lệ");
    }
    if(choice === "12") break;
}
