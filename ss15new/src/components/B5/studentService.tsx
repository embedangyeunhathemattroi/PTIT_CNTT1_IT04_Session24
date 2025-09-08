// Dữ liệu mẫu; thay bằng API thực tế khi có backend
export type Student = {
  mssv: string;
  name: string;
  class: string;
  birthDate: string; // ISO date string
  address: string;
  // có thể bổ sung thêm fields: gpa, major, etc.
};

export async function getStudents(): Promise<Student[]> {
  // TODO: thay bằng fetch/axios tới API thật
  return [
    { mssv: 'SV001', name: 'Ngô Văn A', class: 'CNTT1', birthDate: '1999-01-01', address: 'Hà Nội' },
    { mssv: 'SV002', name: 'Trần Thị B', class: 'CNTT2', birthDate: '2000-05-12', address: 'Hồ Chí Minh' },
  ];
}

export async function getStudentById(mssv: string): Promise<Student | null> {
  const list = await getStudents();
  return list.find(s => s.mssv === mssv) ?? null;
}