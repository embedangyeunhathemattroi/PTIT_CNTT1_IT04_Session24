import { useState, useEffect } from "react";
import { Input, Select, Pagination } from "antd";
import TicketForm from "./TicketForm";
import TicketTable from "./TicketTable";
export interface Ticket {
  id: string;
  movie: string;
  time: string;
  seat: string;
  status: string;
}
export default function TicketManager() {
  const [movie, setMovie] = useState("");
  const [time, setTime] = useState("");
  const [seat, setSeat] = useState("");
  const [status, setStatus] = useState("Chưa bán");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const pageSize = 5;
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    const saved = localStorage.getItem("tickets");
    return saved ? JSON.parse(saved) : [];
  });
  // Dữ liệu mẫu thực tế với tên phim cụ thể
  useEffect(() => {
    if (tickets.length === 0) {
      const sample: Ticket[] = [
        { id: "1", movie: "Avatar 2", time: "10:00", seat: "A1", status: "Chưa bán" },
        { id: "2", movie: "Avengers: Endgame", time: "12:00", seat: "A2", status: "Đã bán" },
        { id: "3", movie: "Spider-Man: No Way Home", time: "14:00", seat: "A3", status: "Chưa bán" },
        { id: "4", movie: "The Batman", time: "16:00", seat: "A4", status: "Đã bán" },
        { id: "5", movie: "Doctor Strange", time: "18:00", seat: "A5", status: "Chưa bán" },
        { id: "6", movie: "Black Panther: Wakanda Forever", time: "20:00", seat: "A6", status: "Đã bán" },
        { id: "7", movie: "Thor: Love and Thunder", time: "10:30", seat: "B1", status: "Chưa bán" },
        { id: "8", movie: "Jurassic World: Dominion", time: "12:30", seat: "B2", status: "Đã bán" },
        { id: "9", movie: "Minions: The Rise of Gru", time: "14:30", seat: "B3", status: "Chưa bán" },
        { id: "10", movie: "Lightyear", time: "16:30", seat: "B4", status: "Đã bán" },
      ];
      saveTickets(sample);
    }
  }, []);

  const saveTickets = (list: Ticket[]) => {
    setTickets(list);
    localStorage.setItem("tickets", JSON.stringify(list));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!movie || !time || !seat) return;

    if (editingId) {
      const updated = tickets.map(t =>
        t.id === editingId ? { ...t, movie, time, seat, status } : t
      );
      saveTickets(updated);
      setEditingId(null);
    } else {
      saveTickets([...tickets, { id: Date.now().toString(), movie, time, seat, status }]);
    }

    setMovie(""); setTime(""); setSeat(""); setStatus("Chưa bán");
  };

  const handleEdit = (t: Ticket) => {
    setMovie(t.movie); setTime(t.time); setSeat(t.seat); setStatus(t.status); setEditingId(t.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa vé?")) {
      const updated = tickets.filter(t => t.id !== id);
      saveTickets(updated);
      if (editingId === id) {
        setEditingId(null);
        setMovie(""); setTime(""); setSeat(""); setStatus("Chưa bán");
      }
      const totalPage = Math.ceil(updated.length / pageSize);
      setCurrentPage(prev => prev > totalPage ? (totalPage > 0 ? totalPage : 1) : prev);
    }
  };
  // Filter + search
  const filteredTickets = tickets
    .filter(t => t.movie.toLowerCase().includes(search.toLowerCase()))
    .filter(t => filterStatus === "Tất cả" ? true : t.status === filterStatus);

  const totalTickets = filteredTickets.length;
  const startIndex = (currentPage - 1) * pageSize;
  const currentTickets = filteredTickets.slice(startIndex, startIndex + pageSize);

  return (
    <div className="p-6 max-w-4xl mx-auto border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">🎬 Quản Lý Vé Xem Phim</h2>

      <TicketForm
        movie={movie} time={time} seat={seat} status={status} editingId={editingId}
        setMovie={setMovie} setTime={setTime} setSeat={setSeat} setStatus={setStatus}
        handleSubmit={handleSubmit}
      />

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Tìm kiếm theo tên phim..."
          value={search}
          onChange={e => { setSearch(e.target.value); setCurrentPage(1); }}
        />
        <Select value={filterStatus} onChange={v => { setFilterStatus(v); setCurrentPage(1); }}>
          <Select.Option value="Tất cả">Tất cả</Select.Option>
          <Select.Option value="Chưa bán">Chưa bán</Select.Option>
          <Select.Option value="Đã bán">Đã bán</Select.Option>
        </Select>
      </div>

      <TicketTable tickets={currentTickets} handleEdit={handleEdit} handleDelete={handleDelete} />

      {totalTickets > pageSize && (
        <Pagination
          className="mt-4"
          current={currentPage}
          pageSize={pageSize}
          total={totalTickets}
          onChange={p => setCurrentPage(p)}
        />
      )}
    </div>
  );
}
