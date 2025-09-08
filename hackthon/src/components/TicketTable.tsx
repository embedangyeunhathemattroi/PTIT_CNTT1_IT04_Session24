import { Pencil, Trash2 } from "lucide-react";

interface Ticket {
  id: string;
  movie: string;
  time: string;
  seat: string;
  status: string;
}

interface TicketTableProps {
  tickets: Ticket[];
  handleEdit: (t: Ticket) => void;
  handleDelete: (id: string) => void;
}

export default function TicketTable({ tickets, handleEdit, handleDelete }: TicketTableProps) {
  return (
    <table className="w-full border text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-2">Phim</th>
          <th className="border px-2">Suất chiếu</th>
          <th className="border px-2">Ghế</th>
          <th className="border px-2">Trạng thái</th>
          <th className="border px-2">Hành động</th>
        </tr>
      </thead>
      <tbody>
        {tickets.length === 0 && (
          <tr><td colSpan={5} className="text-center p-2">Không có dữ liệu</td></tr>
        )}
        {tickets.map(t => (
          <tr key={t.id}>
            <td className="border px-2">{t.movie}</td>
            <td className="border px-2">{t.time}</td>
            <td className="border px-2">{t.seat}</td>
            <td className={`border px-2 font-bold ${t.status==="Đã bán"?"text-red-500":"text-green-500"}`}>{t.status}</td>
            <td className="border px-2 flex gap-2 justify-center">
              <Pencil className="text-orange-500 cursor-pointer" onClick={() => handleEdit(t)} />
              <Trash2 className="text-red-500 cursor-pointer" onClick={() => handleDelete(t.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
