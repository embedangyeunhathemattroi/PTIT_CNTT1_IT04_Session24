import React from "react";
import Headers from "./Headers";
import FormAddTask from "./FormAddTask";
import Tabs from "./Tabs";
import TodoList from "./TodoList";

export default function TodoListIndex() {
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card">
              <div className="card-body p-5">
                <Headers />
                <FormAddTask />
                <Tabs />
                <TodoList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
