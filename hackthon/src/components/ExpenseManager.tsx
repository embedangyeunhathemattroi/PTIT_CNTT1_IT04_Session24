import { Button, Input, Pagination, DatePicker } from "antd";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";

interface Expense {
  id: string;
  name: string;
  amount: number;
  date: string; // ISO string
  category: string;
}

export default function ExpenseManager() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) {
      const parsed: Expense[] = JSON.parse(saved).map(e => ({
        ...e,
        amount: Number(e.amount) || 0,
      }));
      setExpenses(parsed);
    } else {
      const sample: Expense[] = [
        { id: "1", name: "Đi chợ", amount: 200000, date: new Date().toISOString(), category: "Ăn uống" },
        { id: "2", name: "Đi xe bus", amount: 15000, date: new Date().toISOString(), category: "Di chuyển" },
        { id: "3", name: "Mua sách", amount: 120000, date: new Date().toISOString(), category: "Giáo dục" },
      ];
      setExpenses(sample);
      localStorage.setItem("expenses", JSON.stringify(sample));
    }
  }, []);

  const saveExpenses = (list: Expense[]) => {
    setExpenses(list);
    localStorage.setItem("expenses", JSON.stringify(list));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !amount || !date || !category.trim()) return;

    const isoDate = date.toISOString();

    if (editingId) {
      const updated = expenses.map(exp =>
        exp.id === editingId ? { ...exp, name, amount, date: isoDate, category } : exp
      );
      saveExpenses(updated);
      setEditingId(null);
    } else {
      const newExp: Expense = { id: Date.now().toString(), name, amount, date: isoDate, category };
      saveExpenses([...expenses, newExp]);
    }

    setName("");
    setAmount(0);
    setDate(null);
    setCategory("");
  };

  const handleEdit = (exp: Expense) => {
    setName(exp.name);
    setAmount(exp.amount);
    setDate(dayjs(exp.date));
    setCategory(exp.category);
    setEditingId(exp.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa khoản chi này?")) {
      const updated = expenses.filter(e => e.id !== id);
      saveExpenses(updated);
      if (editingId === id) {
        setEditingId(null);
        setName("");
        setAmount(0);
        setDate(null);
        setCategory("");
      }

      const totalPage = Math.ceil(updated.length / pageSize);
      setCurrentPage(prev => (prev > totalPage ? (totalPage > 0 ? totalPage : 1) : prev));
    }
  };

  const sorted = [...expenses].sort((a, b) => a.amount - b.amount);
  const startIndex = (currentPage - 1) * pageSize;
  const currentItems = sorted.slice(startIndex, startIndex + pageSize);

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>💰 Quản Lý Chi Tiêu</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 2fr 1fr auto", gap: 10, marginBottom: 20 }}>
        <Input placeholder="Tên khoản chi" value={name} onChange={e => setName(e.target.value)} />
        <Input
          type="number"
          placeholder="Số tiền"
          value={amount}
          onChange={e => setAmount(Number(e.target.value) || 0)}
        />
        <DatePicker value={date} onChange={d => setDate(d)} style={{ width: "100%" }} />
        <Input placeholder="Loại chi" value={category} onChange={e => setCategory(e.target.value)} />
        <Button type="primary" htmlType="submit">{editingId ? "Cập nhật" : "Thêm"}</Button>
      </form>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ backgroundColor: "#f5f5f5" }}>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Tên</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Số tiền</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Ngày</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Loại</th>
            <th style={{ border: "1px solid #ddd", padding: 8 }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: 10 }}>Không có dữ liệu</td>
            </tr>
          )}
          {currentItems.map(e => (
            <tr key={e.id}>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{e.name}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{e.amount}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{dayjs(e.date).format("DD/MM/YYYY")}</td>
              <td style={{ border: "1px solid #ddd", padding: 8 }}>{e.category}</td>
              <td style={{ border: "1px solid #ddd", padding: 8, display: "flex", gap: 8, justifyContent: "center" }}>
                <Pencil className="text-orange-500 cursor-pointer" onClick={() => handleEdit(e)} />
                <Trash2 className="text-red-500 cursor-pointer" onClick={() => handleDelete(e.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {expenses.length > pageSize && (
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={expenses.length}
          onChange={p => setCurrentPage(p)}
          style={{ marginTop: 20, textAlign: "center" }}
        />
      )}
    </div>
  );
}
