import React from "react";

interface Props {
  stt: number;
  maSV: string;
  ten: string;
  tuoi: number;
  gioiTinh: string;
}

export default function StudentItem({ stt, maSV, ten, tuoi, gioiTinh }: Props) {
  return (
    <tr>
      <td>{stt}</td>
      <td>{maSV}</td>
      <td>{ten}</td>
      <td>{tuoi}</td>
      <td>{gioiTinh}</td>
      <td>
        <div className="template-demo">
          <button type="button" className="btn btn-danger btn-icon-text">Xem</button>
          <button type="button" className="btn btn-warning btn-icon-text">Sửa</button>
          <button type="button" className="btn btn-success btn-icon-text">Xóa</button>
        </div>
      </td>
    </tr>
  );
}
