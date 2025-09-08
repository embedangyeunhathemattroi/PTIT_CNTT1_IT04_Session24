"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sv1 = {
    studentId: "SV01",
    name: "linh",
    email: "phamlinh@gmail.com",
    hasCompleted: true,
    finalScore: 60 // chỉ có nếu học viên đã hoàn thành ?: la co hoac ko co cx dc khi truyen gia tri 
};
//tao data khoa hoc
const course1 = {
    courseId: "C01",
    title: "Lap trinh reactjs",
    instructor: "",
    students: [sv1], //mot mang chua hoc sinh
    isActive: true
}; //co the tao them course nx vs isActive la false
const CourseManager = {
    schoolName: "PTIT",
    year: 2024,
    courses: [course1],
};
//co data roi tao ham  Trả về danh sách học viên đã hoàn thành khóa học (hasCompleted: true).
function getCompletedStudents(course) {
    //goi course  roi di loc
    return course.students.filter((item) => item.hasCompleted);
    //tra ve kqua la log ra ngoai
}
console.log(getCompletedStudents(course1));
// //đếm tổng học viên
// function countStudents(course: Course): number {
//   return course.students.length;
// }
// //tổng học viên đã hoàn  thanh thi ph student.filter(de lọc) cho s tuong trung cho student , tro toi phan hasCompleted =true thì in ra do dai mang
// function countCompletedStudents(course: Course): number {
//   return course.students.filter(s => s.hasCompleted).length;
// }
//tu duy tinh diem trung binh, diem khac so , goi NULL.
function calculateAverageScore(course) {
    const completed = course.students.filter(s => s.hasCompleted && s.finalScore !== undefined); //loc  co diem va diem hoan thanh khac thi de 
    if (completed.length === 0)
        return null; //ko ai hoan thanh thi null
    //tinh tong diem
    const total = completed.reduce((sum, s) => sum + (s.finalScore ?? 0), 0);
    //tra ve trung binh
    return total / completed.length;
}
//in ra thong tin tung khoa học
function printCourseInfo(course, index) {
    const avgScore = calculateAverageScore(course); //diem tb
    const status = course.isActive ? "ĐANG MỞ" : "ĐÃ ĐÓNG"; //trang thai
    console.log(`${index + 1}.Khóa: ${course.title} (GV: ${course.instructor})`);
    console.log(`\n    - Tổng học viên: ${countStudents(course)}`);
    console.log(`    - Hoàn thành: ${countCompletedStudents(course)} học viên`);
    console.log(`    - Trung bình điểm: ${avgScore !== null ? avgScore.toFixed(1) : "N/A"}`);
    console.log(`    - Trạng thái: ${status}\n`);
}
//in ra tat ca khoa hoc trong he 
function printCourseManager(manager) {
    manager.courses.forEach((course, index) => {
        printCourseInfo(course, index);
    });
}
const studentA = {
    studentId: "S001",
    name: "Nguyễn Văn A",
    email: "a@gmail.com",
    hasCompleted: true,
    finalScore: 9
};
const studentB = {
    studentId: "S002",
    name: "Lê Thị B",
    email: "b@gmail.com",
    hasCompleted: true,
    finalScore: 8
};
const studentC = {
    studentId: "S003",
    name: "Trần Văn C",
    email: "c@gmail.com",
    hasCompleted: false
};
const studentD = {
    studentId: "S004",
    name: "Đỗ Thị D",
    email: "d@gmail.com",
    hasCompleted: false
};
const course1 = {
    courseId: "C001",
    title: "TypeScript Cơ Bản",
    instructor: "Nguyễn Văn A",
    students: [studentA, studentB, studentC],
    isActive: true
};
const course2 = {
    courseId: "C002",
    title: "HTML & CSS",
    instructor: "Trần Thị B",
    students: [studentC, studentD],
    isActive: false
};
const manager = {
    schoolName: "Trung tâm F8",
    year: 2025,
    courses: [course1, course2]
};
printCourseManager(manager);
//# sourceMappingURL=PTIT_HN_CNTT4_IT104_SS4_bai10.js.map