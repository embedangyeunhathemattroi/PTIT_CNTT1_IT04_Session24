import React from "react";
import ControlPanel from "./ControlPanel";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";

export default function App() {
  return (
    <div className="row">
      {/* Bên trái: ControlPanel + StudentForm */}
      <div className="col-lg-7 grid-margin stretch-card">
        <div className="card">
          <ControlPanel />
          <StudentForm />
        </div>
      </div>

      {/* Bên phải: StudentForm */}
      <div className="col-5 grid-margin">
        <div className="card">
          <StudentForm />
        </div>
      </div>
    </div>
  );
}
