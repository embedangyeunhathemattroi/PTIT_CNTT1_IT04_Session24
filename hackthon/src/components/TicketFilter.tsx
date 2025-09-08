import { Input, Select } from "antd";

interface TicketFilterProps {
  search: string;
  setSearch: (v: string) => void;
  filterStatus: string;
  setFilterStatus: (v: string) => void;
}

export default function TicketFilter({ search, setSearch, filterStatus, setFilterStatus }: TicketFilterProps) {
  return (
    <div className="flex gap-2 mb-4">
      <Input
        placeholder="Tìm kiếm theo tên phim..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Select
        value={filterStatus}
        onChange={v => setFilterStatus(v)}
      >
        <Select.Option value="Tất cả">Tất cả</Select.Option>
        <Select.Option value="Chưa bán">Chưa bán</Select.Option>
        <Select.Option value="Đã bán">Đã bán</Select.Option>
      </Select>
    </div>
  );
}
