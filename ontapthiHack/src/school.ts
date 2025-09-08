// =======================
// Lớp Student - Học sinh
// =======================
class Student {
    constructor(
        public id: number,
        public name: string,
        public grade: number = 0
    ) {}
}

// =======================
// Lớp Teacher - Giáo viên
// =======================
class Teacher {
    constructor(
        public id: number,
        public name: string,
        public subject: string
    ) {}
}

// =======================
// Lớp Classroom - Lớp học
// =======================
class Classroom {
    public students: Student[] = [];
    public teacher?: Teacher;

    constructor(public name: string) {}

    // Thêm học sinh
    addStudent(student: Student): void {
        this.students.push(student);
        console.log(`✅ Đã thêm học sinh ${student.name} vào lớp ${this.name}`);
    }

    // Xóa học sinh
    removeStudent(studentId: number): void {
        const index = this.students.findIndex(s => s.id === studentId);
        if (index !== -1) {
            const removed = this.students.splice(index, 1)[0];
            console.log(`🗑️ Đã xóa học sinh ${removed.name} khỏi lớp ${this.name}`);
        } else {
            console.log("❌ Không tìm thấy học sinh để xóa.");
        }
    }

    // Gán giáo viên
    assignTeacher(teacher: Teacher): void {
        this.teacher = teacher;
        console.log(`📚 Giáo viên ${teacher.name} đã được phân công cho lớp ${this.name}`);
    }

    // Xóa giáo viên
    removeTeacher(): void {
        if (this.teacher) {
            console.log(`🗑️ Đã hủy phân công giáo viên ${this.teacher.name} khỏi lớp ${this.name}`);
            this.teacher = undefined;
        } else {
            console.log("❌ Lớp chưa có giáo viên.");
        }
    }

    // Hiển thị thông tin lớp
    showInfo(): void {
        console.log(`===== Thông tin lớp ${this.name} =====`);
        console.log(`Giáo viên chủ nhiệm: ${this.teacher ? this.teacher.name : "Chưa có"}`);
        console.log("Danh sách học sinh:");
        this.students.forEach(s => console.log(`- ${s.name} (Điểm: ${s.grade})`));
    }

    // Tìm học sinh theo tên
    findStudentByName(name: string): void {
        const found = this.students.filter(s => s.name.toLowerCase().includes(name.toLowerCase()));
        if (found.length > 0) {
            console.log("🔍 Kết quả tìm kiếm:");
            found.forEach(s => console.log(`- ${s.name} (Điểm: ${s.grade})`));
        } else console.log("❌ Không tìm thấy học sinh.");
    }

    // Tìm học sinh theo điểm (>= min, <= max)
    findStudentByGrade(min: number, max: number): void {
        const found = this.students.filter(s => s.grade >= min && s.grade <= max);
        if (found.length > 0) {
            console.log(`🔍 Học sinh có điểm từ ${min} đến ${max}:`);
            found.forEach(s => console.log(`- ${s.name} (Điểm: ${s.grade})`));
        } else console.log("❌ Không có học sinh trong khoảng điểm này.");
    }

    // Cập nhật điểm
    updateGrade(studentId: number, newGrade: number): void {
        const student = this.students.find(s => s.id === studentId);
        if (student) {
            student.grade = newGrade;
            console.log(`✏️ Cập nhật điểm cho ${student.name} thành ${newGrade}`);
        } else console.log("❌ Không tìm thấy học sinh.");
    }

    // Thống kê điểm
    stats(): void {
        if (this.students.length === 0) {
            console.log("❌ Lớp chưa có học sinh.");
            return;
        }
        const avg = this.students.reduce((sum, s) => sum + s.grade, 0) / this.students.length;
        const above8 = this.students.filter(s => s.grade >= 8).length;
        const below5 = this.students.filter(s => s.grade < 5).length;
        console.log(`📊 Thống kê lớp ${this.name}:`);
        console.log(`- Điểm trung bình: ${avg.toFixed(2)}`);
        console.log(`- Học sinh >= 8 điểm: ${above8}`);
        console.log(`- Học sinh < 5 điểm: ${below5}`);
    }

    // Sắp xếp học sinh theo điểm
    sortByGrade(desc: boolean = false): void {
        this.students.sort((a, b) => desc ? b.grade - a.grade : a.grade - b.grade);
        console.log(`📈 Danh sách học sinh lớp ${this.name} đã được sắp xếp theo điểm ${desc ? "giảm dần" : "tăng dần"}`);
    }
}

// =======================
// Demo
// =======================
const s1 = new Student(1, "Nguyễn Văn A", 7.5);
const s2 = new Student(2, "Trần Thị B", 8.2);
const s3 = new Student(3, "Lê Văn C", 4.8);
const s4 = new Student(4, "Phạm Thị D", 9.0);

const t1 = new Teacher(1, "Nguyễn Minh", "Toán");

const class10A = new Classroom("10A1");

// Thêm học sinh
class10A.addStudent(s1);
class10A.addStudent(s2);
class10A.addStudent(s3);
class10A.addStudent(s4);

// Gán giáo viên
class10A.assignTeacher(t1);

// Cập nhật điểm
class10A.updateGrade(3, 5.0);

// Tìm học sinh theo tên
class10A.findStudentByName("B");

// Tìm học sinh theo điểm
class10A.findStudentByGrade(8, 10);

// Thống kê
class10A.stats();

// Sắp xếp học sinh theo điểm giảm dần
class10A.sortByGrade(true);
class10A.showInfo();

// Xóa học sinh
class10A.removeStudent(2);
class10A.showInfo();

// Hủy phân công giáo viên
class10A.removeTeacher();
