import React from 'react';

type Props = {
  query: string;
  onQuery: (v: string) => void;
};

export default function StudentSearch({ query, onQuery }: Props) {
  return (
    <div className="student-search">
      <input
        placeholder="Tìm theo Mã SV, Tên, Lớp..."
        value={query}
        onChange={(e) => onQuery(e.target.value)}
      />
    </div>
  );
}