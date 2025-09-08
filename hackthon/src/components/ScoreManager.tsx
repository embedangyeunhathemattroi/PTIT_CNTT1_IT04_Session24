import { Button, Input, Pagination } from "antd";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Score {
  id: string;
  student: string;
  subject: string;
  midterm: number;
  final: number;
}

export default function ScoreManager() {
  const [student, setStudent] = useState("");
  const [subject, setSubject] = useState("");
  const [midterm, setMidterm] = useState<number | string>("");
  const [final, setFinal] = useState<number | string>("");
  const [scores, setScores] = useState<Score[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Load dữ liệu từ localStorage khi mount
  useEffect(() => {
    const saved = localStorage.getItem("scores");
    if (saved) {
      setScores(JSON.parse(saved));
    } else {
      // Tạo dữ liệu demo nếu chưa có
      const demo: Score[] = [
        { id: "1", student: "Nguyễn Văn A", subject: "Toán", midterm: 7, final: 8 },
        { id: "2", student: "Trần Thị B", subject: "Lý", midterm: 6, final: 7 },
        { id: "3", student: "Lê Văn C", subject: "Hóa", midterm: 8, final: 9 },
      ];
      setScores(demo);
      localStorage.setItem("scores", JSON.stringify(demo));
    }
  }, []);

  const saveScores = (list: Score[]) => {
    setScores(list);
    localStorage.setItem("scores", JSON.stringify(list));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!student.trim() || !subject.trim() || midterm === "" || final === "") return;

    if (editingId) {
      const updated = scores.map(s =>
        s.id === editingId ? { ...s, student, subject, midterm: Number(midterm), final: Number(final) } : s
      );
      saveScores(updated);
      setEditingId(null);
    } else {
      saveScores([
        ...scores,
        { id: Date.now().toString(), student, subject, midterm: Number(midterm), final: Number(final) }
      ]);
    }

    setStudent(""); setSubject(""); setMidterm(""); setFinal("");
  };

  const handleEdit = (s: Score) => {
    setStudent(s.student); setSubject(s.subject); setMidterm(s.midterm); setFinal(s.final); setEditingId(s.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa điểm này?")) {
      const updated = scores.filter(s => s.id !== id);
      saveScores(updated);
      if (editingId === id) setEditingId(null);

      const totalPage = Math.ceil(updated.length / pageSize);
      setCurrentPage(prev => (prev > totalPage ? (totalPage > 0 ? totalPage : 1) : prev));
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentScores = scores.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-6 max-w-4xl mx-auto border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">📝 Quản Lý Bảng Điểm</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-2 mb-4">
        <Input placeholder="Tên sinh viên" value={student} onChange={e => setStudent(e.target.value)} />
        <Input placeholder="Môn học" value={subject} onChange={e => setSubject(e.target.value)} />
        <Input type="number" placeholder="Điểm giữa kỳ" value={midterm} onChange={e => setMidterm(e.target.value)} />
        <Input type="number" placeholder="Điểm cuối kỳ" value={final} onChange={e => setFinal(e.target.value)} />
        <div className="flex items-center justify-center font-bold">Trung bình</div>
        <Button type="primary" htmlType="submit">{editingId ? "Cập nhật" : "Thêm"}</Button>
      </form>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2">Sinh viên</th>
            <th className="border px-2">Môn học</th>
            <th className="border px-2">Điểm giữa kỳ</th>
            <th className="border px-2">Điểm cuối kỳ</th>
            <th className="border px-2">Trung bình</th>
            <th className="border px-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentScores.map(s => (
            <tr key={s.id}>
              <td className="border px-2">{s.student}</td>
              <td className="border px-2">{s.subject}</td>
              <td className="border px-2">{s.midterm}</td>
              <td className="border px-2">{s.final}</td>
              <td className="border px-2">{((s.midterm + s.final)/2).toFixed(1)}</td>
              <td className="border px-2 flex gap-2 justify-center">
                <Pencil className="text-orange-500 cursor-pointer" onClick={() => handleEdit(s)} />
                <Trash2 className="text-red-500 cursor-pointer" onClick={() => handleDelete(s.id)} />
              </td>
            </tr>
          ))}
          {currentScores.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-2">Không có dữ liệu</td>
            </tr>
          )}
        </tbody>
      </table>

      {scores.length > pageSize && (
        <Pagination className="mt-4" current={currentPage} pageSize={pageSize} total={scores.length} onChange={p => setCurrentPage(p)} />
      )}
    </div>
  );
}
