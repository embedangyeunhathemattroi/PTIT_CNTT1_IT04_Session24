import { Button, Input, Modal, Pagination, DatePicker } from "antd";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

interface Lesson {
  id: string;
  name: string;
  subject: string;
  createdAt: string; // ISO string
}

export default function LessonManager() {
  const [name, setName] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<Dayjs | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5;

  // Load từ localStorage hoặc dữ liệu mẫu
  useEffect(() => {
    const saved = localStorage.getItem("lessons");
    if (saved) {
      setLessons(JSON.parse(saved));
    } else {
      const sample: Lesson[] = [
        { id: "1", name: "Toán cơ bản", subject: "Toán", createdAt: new Date().toISOString() },
        { id: "2", name: "Hóa học 10", subject: "Hóa", createdAt: new Date().toISOString() },
        { id: "3", name: "Văn học Việt Nam", subject: "Văn", createdAt: new Date().toISOString() },
      ];
      setLessons(sample);
      localStorage.setItem("lessons", JSON.stringify(sample));
    }
  }, []);

  const saveLessons = (newList: Lesson[]) => {
    setLessons(newList);
    localStorage.setItem("lessons", JSON.stringify(newList));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !subject.trim() || !createdAt) return;

    const isoDate = createdAt.toISOString();

    if (editingId) {
      const updated = lessons.map(l =>
        l.id === editingId ? { ...l, name, subject, createdAt: isoDate } : l
      );
      saveLessons(updated);
      setEditingId(null);
    } else {
      const newLesson: Lesson = {
        id: Date.now().toString(),
        name,
        subject,
        createdAt: isoDate,
      };
      saveLessons([...lessons, newLesson]);
    }

    setName("");
    setSubject("");
    setCreatedAt(null);
  };

  const handleEdit = (l: Lesson) => {
    setName(l.name);
    setSubject(l.subject);
    setCreatedAt(dayjs(l.createdAt));
    setEditingId(l.id);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc muốn xóa bài học này?",
      onOk: () => {
        const updated = lessons.filter(l => l.id !== id);
        saveLessons(updated);
        if (editingId === id) setEditingId(null);
        const totalPage = Math.ceil(updated.length / pageSize);
        setCurrentPage(prev => (prev > totalPage ? (totalPage > 0 ? totalPage : 1) : prev));
      },
    });
  };

  // Sắp xếp theo ngày tạo mới nhất
  const sortedLessons = [...lessons].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const startIndex = (currentPage - 1) * pageSize;
  const currentLessons = sortedLessons.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">📚 Quản Lý Bài Học</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-2 mb-4">
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Tên bài học" />
        <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Môn học" />
        <DatePicker value={createdAt} onChange={(date) => setCreatedAt(date)} />
        <Button type="primary" htmlType="submit">{editingId ? "Cập nhật" : "Thêm"}</Button>
      </form>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2">Tên bài học</th>
            <th className="border px-2">Môn học</th>
            <th className="border px-2">Ngày tạo</th>
            <th className="border px-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentLessons.map(l => (
            <tr key={l.id}>
              <td className="border px-2">{l.name}</td>
              <td className="border px-2">{l.subject}</td>
              <td className="border px-2">{dayjs(l.createdAt).format("DD/MM/YYYY")}</td>
              <td className="border px-2 flex gap-2 justify-center">
                <Pencil className="text-orange-500 cursor-pointer" onClick={() => handleEdit(l)} />
                <Trash2 className="text-red-500 cursor-pointer" onClick={() => handleDelete(l.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {lessons.length > pageSize && (
        <Pagination
          className="mt-4"
          current={currentPage}
          pageSize={pageSize}
          total={lessons.length}
          onChange={(p) => setCurrentPage(p)}
        />
      )}
    </div>
  );
}
