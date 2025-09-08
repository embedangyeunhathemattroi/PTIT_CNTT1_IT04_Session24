function prinStaffInfo(staff) {
    console.log(`Nhan vien : ${staff.name} (${staff.age}tuoi),Ma Nhan Vien :${staff.employeeId}-Phong :${staff.department} `);
}
const staff = {
    name: "LINH",
    age: 20,
    employeeId: "EMP001",
    department: "ke toan"
};
prinStaffInfo(staff);
