import { Button, Input, DatePicker, Pagination } from "antd";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

interface Book {
  id: string;
  title: string;
  author: string;

}

export default function BookManager() {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<Dayjs | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pageSize = 5;

  // Load dữ liệu từ localStorage hoặc dữ liệu mẫu
  useEffect(() => {
    const saved = localStorage.getItem("books");
    if (saved) {
      setBooks(JSON.parse(saved));
    } else {
      const sample: Book[] = [
        { id: "1", title: "Apple", author: "Nguyễn Văn A", createdAt: new Date().toISOString() },
        { id: "2", title: "Hóa học 10", author: "Trần Thị B", createdAt: new Date().toISOString() },
        { id: "3", title: "Văn học Việt Nam", author: "Lê Văn C", createdAt: new Date().toISOString() },
      ];
      setBooks(sample);
      localStorage.setItem("books", JSON.stringify(sample));
    }
  }, []);

  const saveBooks = (newList: Book[]) => {
    setBooks(newList);
    localStorage.setItem("books", JSON.stringify(newList));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !createdAt) return;

    const isoDate = createdAt.toISOString();

    if (editingId) {
      const updated = books.map((b) =>
        b.id === editingId ? { ...b, title, author, createdAt: isoDate } : b
      );
      saveBooks(updated);
      setEditingId(null);
    } else {
      const newBook: Book = {
        id: Date.now().toString(),
        title,
        author,
        createdAt: isoDate,
      };
      saveBooks([...books, newBook]);
    }

    setTitle("");
    setAuthor("");
    setCreatedAt(null);
  };

  const handleEdit = (b: Book) => {
    setTitle(b.title);
    setAuthor(b.author);
    setCreatedAt(dayjs(b.createdAt));
    setEditingId(b.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa sách này?")) {
      const updated = books.filter((b) => b.id !== id);
      saveBooks(updated);
      if (editingId === id) setEditingId(null);

      const totalPage = Math.ceil(updated.length / pageSize);
      setCurrentPage((prev) => (prev > totalPage ? (totalPage > 0 ? totalPage : 1) : prev));
    }
  };

  // Sắp xếp theo ngày tạo mới nhất
  const sortedBooks = [...books].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const startIndex = (currentPage - 1) * pageSize;
  const currentBooks = sortedBooks.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">📚 Quản Lý Sách</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-2 mb-4">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Tên sách" />
        <Input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Tác giả" />
        <DatePicker value={createdAt} onChange={(date) => setCreatedAt(date)} />
        <Button type="primary" htmlType="submit">
          {editingId ? "Cập nhật" : "Thêm"}
        </Button>
      </form>

      {/* Bảng */}
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2">Tên sách</th>
            <th className="border px-2">Tác giả</th>
            <th className="border px-2">Ngày tạo</th>
            <th className="border px-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks.map((b) => (
            <tr key={b.id}>
              <td className="border px-2">{b.title}</td>
              <td className="border px-2">{b.author}</td>
              <td className="border px-2">{dayjs(b.createdAt).format("DD/MM/YYYY")}</td>
              <td className="border px-2 flex gap-2 justify-center">
                <Pencil className="text-orange-500 cursor-pointer" onClick={() => handleEdit(b)} />
                <Trash2 className="text-red-500 cursor-pointer" onClick={() => handleDelete(b.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {books.length > pageSize && (
        <Pagination
          className="mt-4"
          current={currentPage}
          pageSize={pageSize}
          total={books.length}
          onChange={(p) => setCurrentPage(p)}
        />
      )}
    </div>
  );
}
