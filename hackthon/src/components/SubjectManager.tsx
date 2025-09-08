import { Button, Input, Pagination } from "antd";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Employee {
  id: string;
  name: string;
  position: string;
  salary: number;
  department: string;
}

export default function EmployeeManager() {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState<number | string>("");
  const [department, setDepartment] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Load dữ liệu từ localStorage khi mount
  useEffect(() => {
    const saved = window.localStorage.getItem("employees");
    if (saved) {
      try {
        setEmployees(JSON.parse(saved));
      } catch {
        console.error("Dữ liệu localStorage bị lỗi!");
        setEmployees([]);
      }
    }
  }, []);

  const saveEmployees = (list: Employee[]) => {
    setEmployees(list);
    window.localStorage.setItem("employees", JSON.stringify(list));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !position.trim() || !salary || !department.trim()) return;

    if (editingId) {
      const updated = employees.map(emp =>
        emp.id === editingId
          ? { ...emp, name, position, salary: Number(salary), department }
          : emp
      );
      saveEmployees(updated);
      setEditingId(null);
    } else {
      const newEmp: Employee = {
        id: Date.now().toString(),
        name,
        position,
        salary: Number(salary),
        department,
      };
      saveEmployees([...employees, newEmp]);
    }

    setName("");
    setPosition("");
    setSalary("");
    setDepartment("");
  };

  const handleEdit = (emp: Employee) => {
    setName(emp.name);
    setPosition(emp.position);
    setSalary(emp.salary);
    setDepartment(emp.department);
    setEditingId(emp.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa nhân viên này?")) {
      const updated = employees.filter(emp => emp.id !== id);
      saveEmployees(updated);
      if (editingId === id) setEditingId(null);
      const totalPage = Math.ceil(updated.length / pageSize);
      setCurrentPage(prev => (prev > totalPage ? (totalPage > 0 ? totalPage : 1) : prev));
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentEmployees = employees.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">👨‍💼 Quản Lý Nhân Viên</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-2 mb-4">
        <Input value={name} onChange={e => setName(e.target.value)} placeholder="Tên" />
        <Input value={position} onChange={e => setPosition(e.target.value)} placeholder="Chức vụ" />
        <Input value={salary} onChange={e => setSalary(e.target.value)} type="number" placeholder="Lương" />
        <Input value={department} onChange={e => setDepartment(e.target.value)} placeholder="Phòng ban" />
        <Button type="primary" htmlType="submit">{editingId ? "Cập nhật" : "Thêm"}</Button>
      </form>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2">Tên</th>
            <th className="border px-2">Chức vụ</th>
            <th className="border px-2">Lương</th>
            <th className="border px-2">Phòng ban</th>
            <th className="border px-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-2">Không có dữ liệu</td>
            </tr>
          )}
          {currentEmployees.map(emp => (
            <tr key={emp.id}>
              <td className="border px-2">{emp.name}</td>
              <td className="border px-2">{emp.position}</td>
              <td className="border px-2">{emp.salary}</td>
              <td className="border px-2">{emp.department}</td>
              <td className="border px-2 flex gap-2 justify-center">
                <Pencil className="text-orange-500 cursor-pointer" onClick={() => handleEdit(emp)} />
                <Trash2 className="text-red-500 cursor-pointer" onClick={() => handleDelete(emp.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {employees.length > pageSize && (
        <Pagination
          className="mt-4"
          current={currentPage}
          pageSize={pageSize}
          total={employees.length}
          onChange={p => setCurrentPage(p)}
        />
      )}
    </div>
  );
}
