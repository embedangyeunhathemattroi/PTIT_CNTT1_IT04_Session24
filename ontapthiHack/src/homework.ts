interface Student {
    readonly studentId: string;
    name: string;
    email: string;
    hasCompleted: boolean;
    finalScore?: number
}
interface Course {
    courseId: string;
    title: string;
    instructor: string;
    students: Student[];
    isActive: boolean
}
interface CourseManager {
    schoolName: string;
    year: number;
    courses: Course[]
}
function getCompletedStudents(course: Course): Student[] {
    return course.students.filter((student) => student.hasCompleted === true)
}
function calculateAverageScore(course: Course): number | null {
    //Lọc các sinh viên có điểm
    let scoreStudents = course.students.filter((student) => {
        return typeof student.finalScore === "number";
    })
    //Tính điểm trung bình trên toàn khóa
    //Tính tổng các sinh viên có điểm
    if (scoreStudents.length === 0) {
        return null;
    }
    let total = scoreStudents.reduce((total, student) => {
        if (student.finalScore) {
            return total + student.finalScore;
        }
        return total;
    }, 0)
    let avg = total / course.students.length;
    //Trả về kết quả
    return avg;
}
function printCourseReport(manager: CourseManager): void {
    //1. Khóa: typescript (GV: Nguyễn Văn A)
    //-Tổng học viên: 3
    //-Hoàn thành: 2
    //-Trung bình: 6.5
    //-trạng thái: Đang mở
    manager.courses.forEach((course, index) => {
        console.log(`${index + 1}. ${course.title} (GV: ${course.instructor})`);
        console.log(`Tổng học viên: ${course.students.length}`);
        console.log(` Hoàn thành: ${getCompletedStudents(course).length}`);
        let avgScore = calculateAverageScore(course);
        if (avgScore != null) {
            console.log(`Trung bình: ${avgScore}`);
        }
        console.log(`Trạng thái: ${course.isActive ? "Đang mở" : "Đã đóng"}`);
    });
}