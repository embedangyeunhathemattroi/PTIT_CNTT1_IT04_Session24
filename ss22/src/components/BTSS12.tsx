import { useState, useEffect } from "react";
import { Button, Input, Pagination, Modal } from "antd";
import { Pencil, Trash2 } from "lucide-react";

// Định nghĩa interface cho Task
interface Task {
  id: string;
  name: string;
  isCompleted: boolean;
}

export default function TodoList() {
  // State quản lý danh sách công việc
  const [tasks, setTasks] = useState<Task[]>([]);

  // State quản lý input
  const [task, setTask] = useState<string>("");

  // State hiển thị lỗi khi input rỗng
  const [error, setError] = useState<string>("");

  // State để lưu id công việc đang sửa
  const [editingId, setEditingId] = useState<string | null>(null);

  // State phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 5; // số công việc mỗi trang

  // Khi component mount → lấy dữ liệu từ localStorage
  useEffect(() => {
    const localData = localStorage.getItem("tasks");
    if (localData) {
      setTasks(JSON.parse(localData));
    } else {
      // Nếu chưa có dữ liệu → tạo dữ liệu mẫu
      const sample: Task[] = [
        { id: "1", name: "Học React", isCompleted: false },
        { id: "2", name: "Làm bài tập Ant Design", isCompleted: true },
        { id: "3", name: "Đọc tài liệu TailwindCSS", isCompleted: false },
        { id: "4", name: "Ôn lại TypeScript", isCompleted: false },
        { id: "5", name: "Chạy thử TodoList", isCompleted: true },
        { id: "6", name: "Viết báo cáo", isCompleted: false },
        { id: "7", name: "Đi tập gym", isCompleted: false },
      ];
      setTasks(sample);
      localStorage.setItem("tasks", JSON.stringify(sample));
    }
  }, []);

  // Hàm lưu vào state và localStorage
  const saveTasks = (updateTasks: Task[]) => {
    setTasks(updateTasks);
    localStorage.setItem("tasks", JSON.stringify(updateTasks));
  };

  // Xử lý thêm / sửa task
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!task.trim()) {
      setError("Tên công việc không được để trống!");
      return;
    }

    if (editingId) {
      // Sửa task
      const updated = tasks.map((t) =>
        t.id === editingId ? { ...t, name: task } : t
      );
      saveTasks(updated);
      setEditingId(null);
    } else {
      // Thêm task mới
      const newTask: Task = {
        id: Date.now().toString(),
        name: task,
        isCompleted: false,
      };
      saveTasks([...tasks, newTask]);
    }

    setTask("");
    setError("");
  };

  // Xóa task
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Xác nhận",
      content: "Bạn có chắc chắn muốn xóa công việc này không?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        const updated = tasks.filter((t) => t.id !== id);
        saveTasks(updated);
      },
    });
  };

  // Sửa task (load vào input)
  const handleEdit = (task: Task) => {
    setTask(task.name);
    setEditingId(task.id);
  };

  // Đổi trạng thái hoàn thành
  const handleToggleStatus = (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    saveTasks(updated);
  };

  // Tính toán phân trang
  const totalTasks = tasks.length;
  const startIndex = (currentPage - 1) * pageSize;
  const currentTasks = tasks.slice(startIndex, startIndex + pageSize);

  // Đếm số công việc đã hoàn thành
  const completedCount = tasks.filter((t) => t.isCompleted).length;

  return (
    <div className="h-screen flex justify-center items-center bg-gray-50">
      <div className="w-[800px] border border-gray-200 p-6 rounded-lg shadow-lg bg-white">
        {/* Tiêu đề */}
        <h2 className="text-center text-2xl font-bold mb-6">
          Danh sách công việc
        </h2>

        {/* Form nhập công việc */}
        <form onSubmit={handleSubmit} className="flex gap-3 mb-3">
          <Input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Nhập tên công việc"
          />
          <Button type="primary" htmlType="submit">
            {editingId ? "Cập nhật" : "Thêm"}
          </Button>
        </form>

        {/* Hiển thị lỗi */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {/* Danh sách công việc */}
        <ul className="mb-6">
          {currentTasks.map((t) => (
            <li
              key={t.id}
              className="flex justify-between items-center py-2 border-b"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={t.isCompleted}
                  onChange={() => handleToggleStatus(t.id)}
                />
                {t.isCompleted ? (
                  <s className="text-gray-500">{t.name}</s>
                ) : (
                  <span>{t.name}</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <Pencil
                  size={18}
                  onClick={() => handleEdit(t)}
                  className="text-blue-500 cursor-pointer hover:text-blue-700"
                />
                <Trash2
                  size={18}
                  onClick={() => handleDelete(t.id)}
                  className="text-red-500 cursor-pointer hover:text-red-700"
                />
              </div>
            </li>
          ))}
        </ul>

        {/* Phân trang luôn hiển thị */}
        <div className="flex justify-center mb-4">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalTasks}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>

        {/* Thống kê */}
        <p className="text-center">
          Hoàn thành: <b>{completedCount}</b> / <b>{tasks.length}</b>
        </p>
      </div>
    </div>
  );
}
