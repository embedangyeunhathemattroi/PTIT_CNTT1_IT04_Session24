import React from "react";

type User = {
  id: number;
  name: string;
  dob: string;
  gender: string;
  address: string;
};

const users: User[] = [
  {
    id: 1,
    name: "Malcolm Lockyer",
    dob: "21/03/1961",
    gender: "Nam",
    address: "New york",
  },
  {
    id: 2,
    name: "Maria",
    dob: "11/02/1990",
    gender: "Nữ",
    address: "London",
  },
];

export default function UserTable() {
  const tableStyle: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const thStyle: React.CSSProperties = {
    background: "#f5f7fa",
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  };

  const tdStyle: React.CSSProperties = {
    padding: "12px",
    borderBottom: "1px solid #ddd",
  };

  const buttonEdit: React.CSSProperties = {
    padding: "6px 12px",
    marginRight: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const buttonDelete: React.CSSProperties = {
    padding: "6px 12px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>STT</th>
          <th style={thStyle}>Họ và tên</th>
          <th style={thStyle}>Ngày sinh</th>
          <th style={thStyle}>Giới tính</th>
          <th style={thStyle}>Địa chỉ</th>
          <th style={thStyle}>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td style={tdStyle}>{index + 1}</td>
            <td style={tdStyle}>{user.name}</td>
            <td style={tdStyle}>{user.dob}</td>
            <td style={tdStyle}>{user.gender}</td>
            <td style={tdStyle}>{user.address}</td>
            <td style={tdStyle}>
              <button style={buttonEdit}>Sửa</button>
              <button style={buttonDelete}>Xóa</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
