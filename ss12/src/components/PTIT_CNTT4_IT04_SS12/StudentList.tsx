import React from "react";
import StudentItem from "./StudentItem";

export default function StudentList() {
  return (
    <div className="card-body">
      <h3 className="card-title">Danh sách sinh viên</h3>
      <div className="table-responsive pt-3">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Mã sinh viên</th>
              <th>Tên sinh viên</th>
              <th>Tuổi</th>
              <th>Giới tính</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <StudentItem stt={1} maSV="SV001" ten="Nguyễn Văn A" tuoi={20} gioiTinh="Nam" />
            <StudentItem stt={2} maSV="SV002" ten="Nguyễn Văn B" tuoi={21} gioiTinh="Nữ" />
            <StudentItem stt={3} maSV="SV003" ten="Nguyễn Văn C" tuoi={19} gioiTinh="Nam" />
          </tbody>
        </table>
      </div>
    </div>
  );
}
