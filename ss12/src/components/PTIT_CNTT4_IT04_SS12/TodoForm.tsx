import React, { useState } from "react";

interface Props {
  onAdd: (title: string) => void;
}

export default function TodoForm({ onAdd }: Props) {
  const [value, setValue] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(value);
    setValue("");
  };

  return (
    <form
      onSubmit={submit}
      className="d-flex justify-content-center align-items-center mb-4"
    >
      <div className="form-outline flex-fill">
        <input
          type="text"
          id="form2"
          className="form-control"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Nhập công việc..."
        />
        <label className="form-label" htmlFor="form2">
          Thêm công việc
        </label>
      </div>
      <button type="submit" className="btn btn-info ms-2">
        Thêm
      </button>
    </form>
  );
}
