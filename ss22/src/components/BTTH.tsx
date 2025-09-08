import React, { useState } from "react";
import { Table, Button, Input, Form, message } from "antd";

interface Student {
  id: string;
  code: string;
  name: string;
  age: number;
  gender: string;
  dob: string;
  birthplace: string;
  address: string;
}

export default function StudentManager() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      code: "SV001",
      name: "Nguyễn Văn A",
      age: 20,
      gender: "Nam",
      dob: "2004-01-01",
      birthplace: "Hà Nội",
      address: "Hà Nội",
    },
    {
      id: "2",
      code: "SV002",
      name: "Nguyễn Văn B",
      age: 21,
      gender: "Nữ",
      dob: "2003-01-01",
      birthplace: "Hà Nội",
      address: "Hà Nội",
    },
    {
      id: "3",
      code: "SV003",
      name: "Nguyễn Văn C",
      age: 19,
      gender: "Nam",
      dob: "2005-01-01",
      birthplace: "Hà Nội",
      address: "Hà Nội",
    },
  ]);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [form] = Form.useForm();
  const [search, setSearch] = useState<string>("");

  // Xóa sinh viên (xoá ngay)
  const handleDelete = (id: string) => {
    setStudents(students.filter((s) => s.id !== id));
    message.success("Đã xóa sinh viên!");
  };

  // Xem chi tiết
  const handleView = (student: Student) => {
    setSelectedStudent(student);
    form.setFieldsValue(student);
  };

  // Sửa
  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    form.setFieldsValue(student);
  };

  // Submit form
  const handleSubmit = (values: any) => {
    if (selectedStudent) {
      // Update
      setStudents(
        students.map((s) =>
          s.id === selectedStudent.id ? { ...selectedStudent, ...values } : s
        )
      );
      message.success("Cập nhật thành công!");
    } else {
      // Add new
      const newStudent: Student = {
        id: Date.now().toString(),
        ...values,
      };
      setStudents([...students, newStudent]);
      message.success("Thêm sinh viên thành công!");
    }
    setSelectedStudent(null);
    form.resetFields();
  };

  // Lọc danh sách theo search
  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      render: (_: any, __: Student, index: number) => index + 1,
    },
    { title: "Mã sinh viên", dataIndex: "code" },
    { title: "Tên sinh viên", dataIndex: "name" },
    { title: "Tuổi", dataIndex: "age" },
    { title: "Giới tính", dataIndex: "gender" },
    {
      title: "Hành động",
      render: (_: any, record: Student) => (
        <div className="flex gap-2">
          <Button
            className="bg-red-400 text-white"
            onClick={() => handleView(record)}
          >
            Xem
          </Button>
          <Button
            className="bg-yellow-400 text-white"
            onClick={() => handleEdit(record)}
          >
            Sửa
          </Button>
          <Button
            className="bg-teal-500 text-white"
            onClick={() => handleDelete(record.id)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex gap-6 p-6 bg-gray-100 min-h-screen">
      {/* Bảng danh sách */}
      <div className="flex-1 bg-white p-4 rounded-lg shadow">
        <div className="flex gap-2 mb-4">
          <Button
            type="primary"
            onClick={() => {
              setSelectedStudent(null);
              form.resetFields();
            }}
          >
            Thêm mới sinh viên
          </Button>
          <Input
            placeholder="Search theo mã hoặc tên"
            className="w-1/3"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <h2 className="text-lg font-bold mb-2">Danh Sách Sinh Viên</h2>
        <Table
          rowKey="id"
          dataSource={filteredStudents}
          columns={columns}
          pagination={false}
        />
      </div>

      {/* Form chi tiết */}
      <div className="w-1/3 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-4">Thông Tin Sinh Viên</h2>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="code"
            label="Mã sinh viên"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Tên sinh viên"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Tuổi"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="dob" label="Ngày sinh">
            <Input placeholder="yyyy-mm-dd" />
          </Form.Item>
          <Form.Item name="birthplace" label="Nơi sinh">
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Địa chỉ">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
