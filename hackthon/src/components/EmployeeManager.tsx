import { useState, useEffect } from "react";

interface Expense {
  id: string;
  name: string;
  amount: number;
  date: string; // YYYY-MM-DD
  category: string;
}

export default function SimpleExpenseManager() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [category, setCategory] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Load dữ liệu từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) {
      setExpenses(JSON.parse(saved));
    } else {
      // Dữ liệu mẫu
      const sample: Expense[] = [
        { id: "1", name: "Đi chợ", amount: 200000, date: "2025-09-05", category: "Ăn uống" },
        { id: "2", name: "Đi xe bus", amount: 15000, date: "2025-09-05", category: "Di chuyển" },
        { id: "3", name: "Mua sách", amount: 120000, date: "2025-09-05", category: "Giáo dục" },
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
    if (!name || !amount || !date || !category) return;

    if (editingId) {
      const updated = expenses.map(exp =>
        exp.id === editingId ? { ...exp, name, amount, date, category } : exp
      );
      saveExpenses(updated);
      setEditingId(null);
    } else {
      saveExpenses([...expenses, { id: Date.now().toString(), name, amount, date, category }]);
    }

    setName("");
    setAmount(0);
    setDate("");
    setCategory("");
  };

  const handleEdit = (exp: Expense) => {
    setName(exp.name);
    setAmount(exp.amount);
    setDate(exp.date);
    setCategory(exp.category);
    setEditingId(exp.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa khoản chi này?")) {
      saveExpenses(expenses.filter(e => e.id !== id));
      if (editingId === id) setEditingId(null);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>💰 Quản Lý Chi Tiêu</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <input placeholder="Tên khoản chi" value={name} onChange={e => setName(e.target.value)} />
        <input
          type="number"
          placeholder="Số tiền"
          value={amount}
          onChange={e => setAmount(e.target.value ? Number(e.target.value) : 0)}
        />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input placeholder="Loại chi" value={category} onChange={e => setCategory(e.target.value)} />
        <button type="submit">{editingId ? "Cập nhật" : "Thêm"}</button>
      </form>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: 4 }}>Tên</th>
            <th style={{ border: "1px solid #ccc", padding: 4 }}>Số tiền</th>
            <th style={{ border: "1px solid #ccc", padding: 4 }}>Ngày</th>
            <th style={{ border: "1px solid #ccc", padding: 4 }}>Loại</th>
            <th style={{ border: "1px solid #ccc", padding: 4 }}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(exp => (
            <tr key={exp.id}>
              <td style={{ border: "1px solid #ccc", padding: 4 }}>{exp.name}</td>
              <td style={{ border: "1px solid #ccc", padding: 4 }}>{exp.amount}</td>
              <td style={{ border: "1px solid #ccc", padding: 4 }}>{exp.date}</td>
              <td style={{ border: "1px solid #ccc", padding: 4 }}>{exp.category}</td>
              <td style={{ border: "1px solid #ccc", padding: 4 }}>
                <button onClick={() => handleEdit(exp)}>Sửa</button>{" "}
                <button onClick={() => handleDelete(exp.id)}>Xóa</button>
              </td>
            </tr>
          ))}
          {expenses.length === 0 && (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: 10 }}>
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
