import React, { Component } from "react";

// Định nghĩa state
type State = {
  email: string;
  submittedData: { email: string } | null;
};

export default class B1 extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    // Khởi tạo state
    this.state = {
      email: "",
      submittedData: null,
    };
  }

  // Xử lý khi người dùng nhập input
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value });
  };

  // Xử lý khi submit form
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn reload trang
    // Lưu dữ liệu vào state submittedData
    this.setState({ submittedData: { email: this.state.email } });
  };

  render() {
    const { email, submittedData } = this.state;
    return (
      <div style={{ padding: 20, fontFamily: "Arial" }}>
        <h2>Form Email</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Email:</label>
          <br />
          <input
            type="email"
            placeholder="Nhập email..."
            value={email}
            onChange={this.handleChange}
            required
            style={{ padding: "5px", marginTop: "5px", marginBottom: "10px", width: "250px" }}
          />
          <br />
          <button type="submit" style={{ padding: "5px 10px" }}>Submit</button>
        </form>
        {submittedData && (
          <div style={{ marginTop: 20, backgroundColor: "#f5f5f5", padding: 10 }}>
            <h3>Dữ liệu đã gửi:</h3>
            <pre>{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  }
}
