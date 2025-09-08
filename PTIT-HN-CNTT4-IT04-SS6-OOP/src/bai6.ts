// Định nghĩa lớp Student
class Student {
    id: number;
    name: string;
    age: number;

    constructor(id: number, name: string, age: number) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    getInfo(): string {
        return `ID: ${this.id}, Name: ${this.name}, Age: ${this.age}`;
    }
}

// Định nghĩa lớp Classroom
class Classroom {
    className: string;
    students: Student[] = [];        
    allStudents: Student[] = [];    

    constructor(className: string) {
        this.className = className;
    }

    // Thêm học sinh vào lớp
    addStudent(student: Student): void {
        this.students.push(student);
        this.allStudents.push(student);
    }
    removeStudent(studentId: number): void {
        const index = this.students.findIndex(s => s.id === studentId);
        if (index !== -1) {
            this.students.splice(index, 1); // Xóa khỏi danh sách lớp
            console.log(`Đã xóa học sinh ID: ${studentId} khỏi lớp.`);
        } else {
            console.log(`Không tìm thấy học sinh ID: ${studentId} trong lớp.`);
        }
    }

    // Chỉnh sửa thông tin học sinh trong lớp
    editStudent(studentId: number, newName: string, newAge: number): void {
        const student = this.students.find(s => s.id === studentId);
        if (student) {
            student.name = newName;
            student.age = newAge;
            console.log(`Đã cập nhật thông tin học sinh ID: ${studentId}`);
        } else {
            console.log(`Không tìm thấy học sinh ID: ${studentId} để chỉnh sửa.`);
        }
    }

    // Hiển thị danh sách học sinh hiện tại
    showStudents(): void {
        console.log(`Danh sách học sinh lớp ${this.className}:`);
        if (this.students.length === 0) {
            console.log("Không có học sinh nào.");
        } else {
            this.students.forEach(s => console.log(s.getInfo()));
        }
    }
}

// ------------------- Kiểm tra -------------------

// Tạo lớp học
const myClass = new Classroom("Lớp 12A1");

// Tạo học sinh
const s1 = new Student(1, "An", 16);
const s2 = new Student(2, "Bình", 17);
const s3 = new Student(3, "Cường", 16);

// Thêm học sinh
myClass.addStudent(s1);
myClass.addStudent(s2);
myClass.addStudent(s3);

// Hiển thị ban đầu
myClass.showStudents();

// Xóa học sinh ID = 2
myClass.removeStudent(2);

// Sửa thông tin học sinh ID = 3
myClass.editStudent(3, "Cường Updated", 17);

// Hiển thị sau thay đổi
myClass.showStudents();
