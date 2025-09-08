import { Button, Input, Pagination, Select } from "antd";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Room {
  id: string;
  number: string;
  type: string;
  price: number;
  status: string;
}

export default function RoomManager() {
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [status, setStatus] = useState("Còn trống");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Load dữ liệu từ localStorage, nếu chưa có thì tạo dữ liệu mẫu
  useEffect(() => {
    const saved = localStorage.getItem("rooms");
    if (saved) {
      setRooms(JSON.parse(saved));
    } else {
      const sample: Room[] = [
        { id: "1", number: "101", type: "Đơn", price: 500000, status: "Còn trống" },
        { id: "2", number: "102", type: "Đôi", price: 800000, status: "Đã đặt" },
        { id: "3", number: "103", type: "Suite", price: 1500000, status: "Còn trống" },
        { id: "4", number: "104", type: "Đơn", price: 500000, status: "Đã đặt" },
        { id: "5", number: "105", type: "Đôi", price: 800000, status: "Còn trống" },
        { id: "6", number: "106", type: "Suite", price: 1500000, status: "Còn trống" },
      ];
      setRooms(sample);
      localStorage.setItem("rooms", JSON.stringify(sample));
    }
  }, []);

  const saveRooms = (list: Room[]) => {
    setRooms(list);
    localStorage.setItem("rooms", JSON.stringify(list));
  };

  // Thêm / Sửa
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!number || !type || !price) return;

    if (editingId) {
      const updated = rooms.map(r =>
        r.id === editingId ? { ...r, number, type, price: Number(price), status } : r
      );
      saveRooms(updated);
      setEditingId(null);
    } else {
      saveRooms([...rooms, { id: Date.now().toString(), number, type, price: Number(price), status }]);
    }

    setNumber(""); setType(""); setPrice(""); setStatus("Còn trống");
  };

  const handleEdit = (r: Room) => {
    setNumber(r.number); setType(r.type); setPrice(r.price); setStatus(r.status); setEditingId(r.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa phòng?")) {
      const updated = rooms.filter(r => r.id !== id);
      saveRooms(updated);

      if (editingId === id) {
        setEditingId(null);
        setNumber(""); setType(""); setPrice(""); setStatus("Còn trống");
      }

      const totalPage = Math.ceil(updated.length / pageSize);
      setCurrentPage(prev => prev > totalPage ? (totalPage > 0 ? totalPage : 1) : prev);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentRooms = rooms.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">🏨 Quản Lý Phòng Khách Sạn</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-2 mb-4">
        <Input placeholder="Số phòng" value={number} onChange={e => setNumber(e.target.value)} />
        <Input placeholder="Loại phòng" value={type} onChange={e => setType(e.target.value)} />
        <Input type="number" placeholder="Giá" value={price} onChange={e => setPrice(e.target.value)} />
        <Select value={status} onChange={v => setStatus(v)}>
          <Select.Option value="Còn trống">Còn trống</Select.Option>
          <Select.Option value="Đã đặt">Đã đặt</Select.Option>
        </Select>
        <Button type="primary" htmlType="submit">{editingId ? "Cập nhật" : "Thêm"}</Button>
      </form>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2">Số phòng</th>
            <th className="border px-2">Loại phòng</th>
            <th className="border px-2">Giá</th>
            <th className="border px-2">Trạng thái</th>
            <th className="border px-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentRooms.map(r => (
            <tr key={r.id}>
              <td className="border px-2">{r.number}</td>
              <td className="border px-2">{r.type}</td>
              <td className="border px-2">{r.price}</td>
              <td className="border px-2">{r.status}</td>
              <td className="border px-2 flex gap-2 justify-center">
                <Pencil className="text-orange-500 cursor-pointer" onClick={() => handleEdit(r)} />
                <Trash2 className="text-red-500 cursor-pointer" onClick={() => handleDelete(r.id)} />
              </td>
            </tr>
          ))}
          {currentRooms.length === 0 && (
            <tr><td colSpan={5} className="text-center p-2">Không có dữ liệu</td></tr>
          )}
        </tbody>
      </table>

      {rooms.length > pageSize && (
        <Pagination
          className="mt-4"
          current={currentPage}
          pageSize={pageSize}
          total={rooms.length}
          onChange={p => setCurrentPage(p)}
        />
      )}
    </div>
  );
}
