import React, { Component, createRef } from 'react'
import Swal from "sweetalert2";

type Student = {
  name: string;
  email: string;
  password: string;
  tele: string;
};

type InitialState = {
  student: Student;
  mess: string;
};

export default class B7 extends Component<{}, InitialState> {
  nameRef = createRef<HTMLInputElement>();

  constructor(props: {}) {
    super(props);
    this.state = {
      student: {
        email: "",
        password: "",
        tele: "",
        name: "",
      },
      mess: "",
    };
  }

  handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("gia tri khi nhap", this.state.student);

    const { name, email, password, tele } = this.state.student;

    // validate dữ liệu rỗng
    if (!name || !email || !password) {
      Swal.fire("Lỗi!", "Tên, Email, Mật khẩu không được để trống!", "error");
      return;
    }

    // lấy danh sách user từ LocalStorage
    let users: Student[] = JSON.parse(localStorage.getItem("students") || "[]");

    // kiểm tra email trùng
    if (users.find((u) => u.email === email)) {
      Swal.fire("Lỗi!", "Email đã tồn tại!", "error");
      return;
    }

    // thêm user mới
    users.push({ name, email, password, tele });
    localStorage.setItem("students", JSON.stringify(users));

    // clear input và focus lại vào ô Name
    this.setState({
      student: { name: "", email: "", password: "", tele: "" },
      mess: "Đăng ký tài khoản thành công",
    });

    Swal.fire("Thành công!", "Đăng ký tài khoản thành công!", "success");

    if (this.nameRef.current) {
      this.nameRef.current.focus();
    }
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({
      student: { ...this.state.student, [name]: value },
    });
  };

  render() {
    return (
      <div>
        <h1>
          <b>Đăng Ky Tài Khoản</b>
        </h1>
        <form action="" onSubmit={this.handleSumit}>
          <label>Student Name</label>
          <input
            type="text"
            onChange={this.handleChange}
            name="name"
            value={this.state.student.name}
            ref={this.nameRef}
          />
          <br />

          <label>Email</label>
          <input
            type="text"
            onChange={this.handleChange}
            name="email"
            value={this.state.student.email}
          />
          <br />

          <label>Password</label>
          <input
            type="password"
            onChange={this.handleChange}
            name="password"
            value={this.state.student.password}
          />
          <br />

          <label>TelePhone</label>
          <input
            type="text"
            onChange={this.handleChange}
            name="tele"
            value={this.state.student.tele}
          />
          <br />

          <button>Đăng Ký</button>
          <hr />
        </form>
      </div>
    );
  }
}
