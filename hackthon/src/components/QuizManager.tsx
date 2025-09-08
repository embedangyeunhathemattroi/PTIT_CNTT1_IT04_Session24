import { Button, Input, Pagination, Select } from "antd";
import { Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface Quiz {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  answer: string;
  subject: string;
}

export default function QuizManager() {
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [answer, setAnswer] = useState("");
  const [subject, setSubject] = useState("");
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterSubject, setFilterSubject] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Load dữ liệu từ localStorage hoặc tạo dữ liệu mẫu
  useEffect(() => {
    const saved = localStorage.getItem("quizzes");
    if (saved) {
      setQuizzes(JSON.parse(saved));
    } else {
      const sample: Quiz[] = [
        { id: "1", question: "Câu 1", optionA: "A1", optionB: "B1", optionC: "C1", optionD: "D1", answer: "A1", subject: "Toán" },
        { id: "2", question: "Câu 2", optionA: "A2", optionB: "B2", optionC: "C2", optionD: "D2", answer: "B2", subject: "Văn" },
        { id: "3", question: "Câu 3", optionA: "A3", optionB: "B3", optionC: "C3", optionD: "D3", answer: "C3", subject: "Anh" },
      ];
      setQuizzes(sample);
      localStorage.setItem("quizzes", JSON.stringify(sample));
    }
  }, []);

  const saveQuizzes = (list: Quiz[]) => {
    setQuizzes(list);
    localStorage.setItem("quizzes", JSON.stringify(list));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !optionA || !optionB || !optionC || !optionD || !answer || !subject) return;

    if (editingId) {
      const updated = quizzes.map(q =>
        q.id === editingId ? { ...q, question, optionA, optionB, optionC, optionD, answer, subject } : q
      );
      saveQuizzes(updated);
      setEditingId(null);
    } else {
      const newQuiz: Quiz = { id: Date.now().toString(), question, optionA, optionB, optionC, optionD, answer, subject };
      saveQuizzes([...quizzes, newQuiz]);
    }

    setQuestion(""); setOptionA(""); setOptionB(""); setOptionC(""); setOptionD(""); setAnswer(""); setSubject("");
  };

  const handleEdit = (q: Quiz) => {
    setQuestion(q.question); setOptionA(q.optionA); setOptionB(q.optionB); setOptionC(q.optionC); setOptionD(q.optionD);
    setAnswer(q.answer); setSubject(q.subject); setEditingId(q.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa câu hỏi?")) {
      const updated = quizzes.filter(q => q.id !== id);
      saveQuizzes(updated);

      if (editingId === id) {
        setEditingId(null);
        setQuestion(""); setOptionA(""); setOptionB(""); setOptionC(""); setOptionD(""); setAnswer(""); setSubject("");
      }

      const totalPage = Math.ceil(updated.length / pageSize);
      setCurrentPage(prev => (prev > totalPage ? (totalPage > 0 ? totalPage : 1) : prev));
    }
  };

  const filtered = filterSubject === "All" ? quizzes : quizzes.filter(q => q.subject === filterSubject);
  const startIndex = (currentPage - 1) * pageSize;
  const currentQuizzes = filtered.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-6 max-w-4xl mx-auto border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">📝 Quản Lý Quiz</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-8 gap-2 mb-4">
        <Input placeholder="Câu hỏi" value={question} onChange={e => setQuestion(e.target.value)} />
        <Input placeholder="A" value={optionA} onChange={e => setOptionA(e.target.value)} />
        <Input placeholder="B" value={optionB} onChange={e => setOptionB(e.target.value)} />
        <Input placeholder="C" value={optionC} onChange={e => setOptionC(e.target.value)} />
        <Input placeholder="D" value={optionD} onChange={e => setOptionD(e.target.value)} />
        <Input placeholder="Đáp án" value={answer} onChange={e => setAnswer(e.target.value)} />
        <Input placeholder="Môn học" value={subject} onChange={e => setSubject(e.target.value)} />
        <Button type="primary" htmlType="submit">{editingId ? "Cập nhật" : "Thêm"}</Button>
      </form>

      <Select
        className="mb-2"
        value={filterSubject}
        onChange={val => { setFilterSubject(val); setCurrentPage(1); }}
        style={{ width: 200 }}
      >
        <Select.Option value="All">Tất cả môn</Select.Option>
        {[...new Set(quizzes.map(q => q.subject))].map(s => <Select.Option key={s} value={s}>{s}</Select.Option>)}
      </Select>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2">Câu hỏi</th>
            <th className="border px-2">A</th>
            <th className="border px-2">B</th>
            <th className="border px-2">C</th>
            <th className="border px-2">D</th>
            <th className="border px-2">Đáp án</th>
            <th className="border px-2">Môn học</th>
            <th className="border px-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentQuizzes.map(q => (
            <tr key={q.id}>
              <td className="border px-2">{q.question}</td>
              <td className="border px-2">{q.optionA}</td>
              <td className="border px-2">{q.optionB}</td>
              <td className="border px-2">{q.optionC}</td>
              <td className="border px-2">{q.optionD}</td>
              <td className="border px-2">{q.answer}</td>
              <td className="border px-2">{q.subject}</td>
              <td className="border px-2 flex gap-2 justify-center">
                <Pencil className="text-orange-500 cursor-pointer" onClick={() => handleEdit(q)} />
                <Trash2 className="text-red-500 cursor-pointer" onClick={() => handleDelete(q.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length > pageSize && (
        <Pagination
          className="mt-4"
          current={currentPage}
          pageSize={pageSize}
          total={filtered.length}
          onChange={p => setCurrentPage(p)}
        />
      )}
    </div>
  );
}
