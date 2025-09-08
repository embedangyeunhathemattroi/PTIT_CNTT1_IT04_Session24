
class Student {
    constructor(
        public id: number,      // Mã học sinh
        public name: string,    // Tên học sinh
        public age: number      // Tuổi
    ) {}
}


class Classroom {
    private students: Student[] = [];     
    private allStudents: Student[] = [];   

    addStudent(student: Student): void {
        this.students.push(student);
        this.allStudents.push(student); 
    }

    // Phương thức hiển thị danh sách học sinh hiện tại trong lớp
    showStudents(): void {
        console.log("Danh sách học sinh trong lớp:");
        this.students.forEach((student) => {
            console.log(`ID: ${student.id}, Tên: ${student.name}, Tuổi: ${student.age}`);
        });
    }


    removeStudent(studentId: number): void {

        const index = this.students.findIndex(s => s.id === studentId);
        if (index !== -1) {
       
            const removedStudent = this.students[index];
           
            this.students.splice(index, 1);
            console.log(`Đã xóa học sinh: ${removedStudent.name}`);
        } else {
            console.log("Không tìm thấy học sinh với ID này.");
        }
    }

    editStudent(studentId: number, newName: string, newAge: number): void {
        const student = this.students.find(s => s.id === studentId);
        if (student) {
            student.name = newName;
            student.age = newAge;
            console.log(`Đã cập nhật học sinh có ID ${studentId}`);
        } else {
            console.log("Không tìm thấy học sinh để chỉnh sửa.");
        }
    }


    showAllStudents(): void {
        console.log("Tất cả học sinh từng có trong lớp:");
        this.allStudents.forEach((student) => {
            console.log(`ID: ${student.id}, Tên: ${student.name}, Tuổi: ${student.age}`);
        });
    }
}


// Tạo lớp học mới
const classroom = new Classroom();

// Thêm học sinh
const s1 = new Student(1, "An", 15);
const s2 = new Student(2, "Bình", 16);
const s3 = new Student(3, "Chi", 15);

classroom.addStudent(s1);
classroom.addStudent(s2);
classroom.addStudent(s3);

// Hiển thị danh sách ban đầu
classroom.showStudents();

// Xóa học sinh có ID 2
classroom.removeStudent(2);

// Sửa thông tin học sinh có ID 3
classroom.editStudent(3, "Chi Nguyễn", 17);

// Hiển thị sau khi thay đổi
classroom.showStudents();

// Hiển thị tất cả học sinh (bao gồm cả đã bị xóa)
classroom.showAllStudents();
