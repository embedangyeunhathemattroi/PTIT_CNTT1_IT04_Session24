import React, { useEffect, useMemo, useState } from 'react';
import { getStudents, type Student } from '../../services/studentService';
import StudentItem from './StudentItem';
import StudentDetails from './StudentDetails';
import StudentSearch from './StudentSearch';
import './StudentList.css';

const PAGE_SIZE = 10;

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>([]);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [selected, setSelected] = useState<Student | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await getStudents();
      setStudents(data);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return students;
    return students.filter(s =>
      [s.mssv, s.name, s.class].join(' ').toLowerCase().includes(q)
    );
  }, [students, query]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    // reset trang về 1 khi filter thay đổi
    setPage(1);
  }, [query]);

  return (
    <div className="student-list">
      <h1>Danh sách sinh viên</h1>

      <StudentSearch query={query} onQuery={setQuery} />

      <table className="student-table">
        <thead>
          <tr>
            <th>Mã SV</th>
            <th>Tên</th>
            <th>Lớp</th>
            <th>Ngày sinh</th>
            <th>Địa chỉ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {paged.map(s => (
            <StudentItem key={s.mssv} data={s} onView={() => setSelected(s)} />
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))}>
          Trước
        </button>
        <span>Trang {page} / {totalPages || 1}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
        >
          Tiếp
        </button>
      </div>

      {selected && (
        <StudentDetails
          student={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}