//Viết một hàm nhận vào đối tượng Student và in ra câu giới thiệu thông tin sinh viên. Ví dụ: "Tên tôi là [name], tôi [age] tuổi và email của tôi là [email]."
function introductionStudent(student) {
    console.log(`ten toi la ${student.name}, toi ${student.age} tuoi va email toi la ${student.email} `);
}
const student1 = {
    id: 1,
    name: "Linh",
    age: 20,
    email: "phamngoclinhtq2006@gmail.com"
};
introductionStudent(student1);
