import React, { Component } from "react";
import { Modal, Button, Form, Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

type Student = {
  id: string;
  name: string;
  dob: string;
  email: string;
  active: boolean;
};

type State = {
  students: Student[];
  showModal: boolean;
  formData: Student;
  currentPage: number;
};

export default class B10 extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      students: [],
      showModal: false,
      formData: { id: "", name: "", dob: "", email: "", active: true },
      currentPage: 1,
    };
  }

  componentDidMount() {
    const saved = localStorage.getItem("students");
    if (saved) {
      this.setState({ students: JSON.parse(saved) });
    } else {
      this.setState({
        students: [
          { id: "SV001", name: "Nguyễn Văn A", dob: "2023-12-21", email: "nva@gmail.com", active: true },
          { id: "SV002", name: "Nguyễn Thị B", dob: "2022-11-21", email: "ntb@gmail.com", active: false },
        ],
      });
    }
  }

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal,
      formData: { id: "", name: "", dob: "", email: "", active: true },
    });
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    this.setState({
      formData: { ...this.state.formData, [name]: value },
    });
  };

  handleSubmit = () => {
    this.setState(
      (prev) => ({
        students: [...prev.students, prev.formData],
        showModal: false,
      }),
      () => {
        localStorage.setItem("students", JSON.stringify(this.state.students));
      }
    );
  };

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
  };


  handleDelete = (id: string) => {
  Swal.fire({
    title: "Bạn có chắc muốn xóa?",
    text: "Hành động này không thể hoàn tác!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  }).then((result) => {
    if (result.isConfirmed) {
      this.setState(
        (prev) => ({
          students: prev.students.filter((s) => s.id !== id),
        }),
        () => localStorage.setItem("students", JSON.stringify(this.state.students))
      );
      Swal.fire("Đã xóa!", "Sinh viên đã bị xóa.", "success");
    }
  });
};

  render() {
    // Lấy ra các state cần thiết từ this.state
    const { students, showModal, formData, currentPage } = this.state;
    const perPage = 5;
    const totalPages = Math.ceil(students.length / perPage);//tong trang
    const startIndex = (currentPage - 1) * perPage;//vi tri bat dau trong trang
    const currentStudents = students.slice(startIndex, startIndex + perPage);//lay ds sv

    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-between mb-3">
          <h4>Quản lý sinh viên</h4>
          <Button variant="primary" onClick={this.toggleModal}>
            Thêm mới sinh viên
          </Button>
        </div>

<table className=" table-bordered ">
  <thead>
    <tr>
      <th>STT</th>
      <th>Mã sinh viên</th>
      <th>Tên sinh viên</th>
      <th>Ngày sinh</th>
      <th>Email</th>
      <th>Trạng thái</th>
      <th>Chức năng</th>
    </tr>
  </thead>
  <tbody>
    {currentStudents.map((s, idx) => (
      <tr key={s.id}>
        <td>{startIndex + idx + 1}</td>
        <td>{s.id}</td>
        <td>{s.name}</td>
        <td>{new Date(s.dob).toLocaleDateString("vi-VN")}</td>
        <td>{s.email}</td>
        <td>
          <span className={`badge ${s.active ? "bg-success" : "bg-danger"}`}>
            {s.active ? "Đang hoạt động" : "Ngừng hoạt động"}
          </span>
        </td>
        <td>
          <Button size="sm" variant="secondary" className="me-2">Chặn</Button>
          <Button size="sm" variant="warning" className="me-2">Sửa</Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => this.handleDelete(s.id)}
          >
            Xóa
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</table>


        <Pagination>
          <Pagination.Prev
            onClick={() => this.handlePageChange(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i}
              active={i + 1 === currentPage}
              onClick={() => this.handlePageChange(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => this.handlePageChange(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          />
        </Pagination>

        <Modal show={showModal} onHide={this.toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Thêm mới sinh viên</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Mã sinh viên</Form.Label>
                <Form.Control name="id" value={formData.id} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Tên sinh viên</Form.Label>
                <Form.Control name="name" value={formData.name} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Ngày sinh</Form.Label>
                <Form.Control type="date" name="dob" value={formData.dob} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={this.handleChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.toggleModal}>
              Hủy
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Thêm mới
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
