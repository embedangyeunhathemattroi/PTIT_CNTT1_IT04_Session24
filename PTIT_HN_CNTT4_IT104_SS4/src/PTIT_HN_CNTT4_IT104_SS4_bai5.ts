type Person={
    name:string;
    age:number;
};
type Employee={
    employeeId:string;
    department:string;
};
type StaffMember=Person & Employee;

function prinStaffInfo(staff:StaffMember):void {
    console.log(`Nhan vien : ${staff.name} (${staff.age}tuoi),Ma Nhan Vien :${staff.employeeId}-Phong :${staff.department} `);
    
    
}


const staff:StaffMember={
    name:"LINH",
    age:20,
    employeeId:"EMP001",
    department:"ke toan"
};
prinStaffInfo(staff)