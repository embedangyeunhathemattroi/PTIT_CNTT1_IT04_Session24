import React, { Component } from "react";
import Swal from "sweetalert2";

type Student = {
  email: string;
  password: string;
};

type InitialState = {
  student: Student;
};

export default class B8 extends Component<{}, InitialState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      student: {
        email: "",
        password: "",
      },
    };
  }

  handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = this.state.student;
    if (!email || !password) {
      Swal.fire("Lỗi!", "Email và mật khẩu không được để trống!", "error");
      return;
    }

    let users: Student[] = JSON.parse(localStorage.getItem("students") || "[]");

    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      Swal.fire("Thành công!", "Đăng nhập thành công!", "success");
    } else {
      Swal.fire("Thất bại!", "Sai email hoặc mật khẩu!", "error");
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
          <b>Đăng Nhập Tài Khoản</b>
        </h1>
        <form onSubmit={this.handleSumit}>
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
          <button>Đăng Nhập</button>
          <hr />
        </form>
      </div>
    );
  }
}
