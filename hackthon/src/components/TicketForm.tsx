import { Input, Button, Select } from "antd";

interface TicketFormProps {
  movie: string;
  time: string;
  seat: string;
  status: string;
  editingId: string | null;
  setMovie: (v: string) => void;
  setTime: (v: string) => void;
  setSeat: (v: string) => void;
  setStatus: (v: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export default function TicketForm({
  movie, time, seat, status, editingId,
  setMovie, setTime, setSeat, setStatus,
  handleSubmit
}: TicketFormProps) {
  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-2 mb-4">
      <Input placeholder="Tên phim" value={movie} onChange={e => setMovie(e.target.value)} />
      <Input placeholder="Suất chiếu" value={time} onChange={e => setTime(e.target.value)} />
      <Input placeholder="Ghế" value={seat} onChange={e => setSeat(e.target.value)} />
      <Select value={status} onChange={v => setStatus(v)}>
        <Select.Option value="Chưa bán">Chưa bán</Select.Option>
        <Select.Option value="Đã bán">Đã bán</Select.Option>
      </Select>
      <Button type="primary" htmlType="submit">{editingId ? "Cập nhật" : "Thêm"}</Button>
    </form>
  );
}
