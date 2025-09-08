import React, { useState } from "react";
import { Button, Input, Select, Pagination, Table, Tag } from "antd";
import { Pencil, Trash2, Home } from "lucide-react";
import { v4 as uuid } from "uuid";

interface Warehouse {
  id: string;
  name: string;
  address: string;
  status: string;
}

export default function WarehouseManager() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([
    {
      id: uuid(),
      name: "Kho Hà Nội",
      address: "123 Đường Láng, Đống Đa, Hà Nội",
      status: "Hoạt động",
    },
    {
      id: uuid(),
      name: "Kho TP.Hồ Chí Minh",
      address: "456 Lê Lợi, Quận 1, TP.HCM",
      status: "Hoạt động",
    },
    {
      id: uuid(),
      name: "Kho Đà Nẵng",
      address: "789 Nguyễn Văn Linh, Hải Châu, Đà Nẵng",
      status: "Ngừng hoạt động",
    },
  ]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("Hoạt động");

  const addWarehouse = () => {
    if (!name || !address) return alert("Vui lòng nhập đầy đủ thông tin!");
    const newWarehouse: Warehouse = {
      id: uuid(),
      name,
      address,
      status,
    };
    setWarehouses([...warehouses, newWarehouse]);
    setName("");
    setAddress("");
    setStatus("Hoạt động");
  };

 
  const deleteWarehouse = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa không?")) {
      setWarehouses(warehouses.filter((w) => w.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setWarehouses(
      warehouses.map((w) =>
        w.id === id
          ? { ...w, status: w.status === "Hoạt động" ? "Ngừng hoạt động" : "Hoạt động" }
          : w
      )
    );
  };

  const columns = [
    {
      title: "Tên kho",
      dataIndex: "name",
      render: (text: string) => <a className="text-blue-500">{text}</a>,
    },
    { title: "Địa chỉ", dataIndex: "address" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: string) =>
        status === "Hoạt động" ? (
          <Tag color="green">Hoạt động</Tag>
        ) : (
          <Tag color="red">Ngừng hoạt động</Tag>
        ),
    },
    {
      title: "Hành động",
      render: (_: any, record: Warehouse) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            size="small"
            icon={<Pencil size={16} />}
            onClick={() => toggleStatus(record.id)}
          >
            Sửa
          </Button>
          <Button
            danger
            size="small"
            icon={<Trash2 size={16} />}
            onClick={() => deleteWarehouse(record.id)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex   justify-center items-center gap-2 mb-6 bg-teal-600 p-3 rounded text-white text-lg font-bold">
        <Home />
        Quản Lý Kho
      </div>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Tên kho"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Địa chỉ"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Select value={status} onChange={(val) => setStatus(val)} style={{ width: 150 }}>
          <Select.Option value="Hoạt động">Hoạt động</Select.Option>
          <Select.Option value="Ngừng hoạt động">Ngừng hoạt động</Select.Option>
        </Select>
        <Button type="primary" onClick={addWarehouse}>
          Thêm
        </Button>
      </div>

      <h2 className="font-semibold mb-2">Danh sách kho</h2>
      <Table
        columns={columns}
        dataSource={warehouses}
        rowKey="id"
        pagination={{ pageSize: 3 }}
      />
    </div>
  );
}
