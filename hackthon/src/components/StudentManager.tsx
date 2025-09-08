import { Button, Input, Pagination } from "antd";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Student {
  id: string;
  name: string;
  age: number;
  major: string;
}

export default function StudentManager() {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | string>("");
  const [major, setMajor] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Load dữ liệu từ localStorage hoặc tạo dữ liệu mẫu
  useEffect(() => {
    const saved = localStorage.getItem("students");
    if (saved) {
      const parsed: Student[] = JSON.parse(saved).map(s => ({
        ...s,
        age: Number(s.age) // đảm bảo age là number
      }));
      setStudents(parsed);
    } else {
      const sample: Student[] = [
        { id: "1", name: "Nguyen Van A", age: 20, major: "CNTT" },
        { id: "2", name: "Tran Thi B", age: 21, major: "Kinh tế" },
      ];
      setStudents(sample);
      localStorage.setItem("students", JSON.stringify(sample));
    }
  }, []);

  const saveStudents = (list: Student[]) => {
    setStudents(list);
    localStorage.setItem("students", JSON.stringify(list));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !age || !major.trim()) return;

    if (editingId) {
      const updated = students.map(s =>
        s.id === editingId ? { ...s, name, age: Number(age), major } : s
      );
      saveStudents(updated);
      setEditingId(null);
    } else {
      const newStudent: Student = {
        id: Date.now().toString(),
        name,
        age: Number(age),
        major,
      };
      saveStudents([...students, newStudent]);
    }

    setName("");
    setAge("");
    setMajor("");
  };

  const handleEdit = (s: Student) => {
    setName(s.name);
    setAge(s.age);
    setMajor(s.major);
    setEditingId(s.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa sinh viên này?")) {
      const updated = students.filter(s => s.id !== id);
      saveStudents(updated);
      if (editingId === id) setEditingId(null);

      const totalPage = Math.ceil(updated.length / pageSize);
      setCurrentPage(prev => (prev > totalPage ? (totalPage > 0 ? totalPage : 1) : prev));
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentStudents = students.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-6 max-w-2xl mx-auto border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">🎓 Quản Lý Sinh Viên</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-2 mb-4">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tên"
        />
        <Input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Tuổi"
        />
        <Input
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          placeholder="Chuyên ngành"
        />
        <Button type="primary" htmlType="submit">
          {editingId ? "Cập nhật" : "Thêm"}
        </Button>
      </form>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2">Tên</th>
            <th className="border px-2">Tuổi</th>
            <th className="border px-2">Chuyên ngành</th>
            <th className="border px-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center py-2">
                Không có dữ liệu
              </td>
            </tr>
          )}
          {currentStudents.map(s => (
            <tr key={s.id}>
              <td className="border px-2">{s.name}</td>
              <td className="border px-2">{s.age}</td>
              <td className="border px-2">{s.major}</td>
              <td className="border px-2 flex gap-2 justify-center">
                <Pencil
                  className="text-orange-500 cursor-pointer"
                  onClick={() => handleEdit(s)}
                />
                <Trash2
                  className="text-red-500 cursor-pointer"
                  onClick={() => handleDelete(s.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {students.length > pageSize && (
        <Pagination
          className="mt-4"
          current={currentPage}
          pageSize={pageSize}
          total={students.length}
          onChange={p => setCurrentPage(p)}
        />
      )}
    </div>
  );
}
