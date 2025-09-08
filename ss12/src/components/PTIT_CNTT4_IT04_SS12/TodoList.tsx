import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList() {
  return (
    <ul className="list-group mb-0">
      <TodoItem title="Cras justo odio" completed />
      <TodoItem title="Cras justo odio" />
    </ul>
  );
}
