import React from 'react';
import { Student } from '../../services/studentService';

type Props = {
  student: Student;
  onClose: () => void;
};

export default function StudentDetails({ student, onClose }: Props) {
  return (
    <div className="modal-backdrop" role="dialog" aria-label="Chi tiết sinh viên">
      <div className="modal-content">
        <h2>Chi tiết sinh viên</h2>
        <p><strong>Mã SV:</strong> {student.mssv}</p>
        <p><strong>Tên:</strong> {student.name}</p>
        <p><strong>Lớp:</strong> {student.class}</p>
        <p><strong>Ngày sinh:</strong> {new Date(student.birthDate).toLocaleDateString()}</p>
        <p><strong>Địa chỉ:</strong> {student.address}</p>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
}