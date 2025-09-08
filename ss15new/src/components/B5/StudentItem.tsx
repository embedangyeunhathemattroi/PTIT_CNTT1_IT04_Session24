import React from 'react';
import { Student } from '../../services/studentService';

type Props = {
  data: Student;
  onView: () => void;
};

export default function StudentItem({ data, onView }: Props) {
  return (
    <tr className="student-item">
      <td>{data.mssv}</td>
      <td>{data.name}</td>
      <td>{data.class}</td>
      <td>{new Date(data.birthDate).toLocaleDateString()}</td>
      <td>{data.address}</td>
      <td>
        <button onClick={onView}>Xem chi tiết</button>
        <button>Chỉnh sửa</button>
        <button>Xóa</button>
      </td>
    </tr>
  );
}