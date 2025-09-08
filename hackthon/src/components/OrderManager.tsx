import React, { useState, useEffect } from 'react';
import { Plus, X, Edit2, Check } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, newText: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleUpdate = () => {
    if (editText.trim()) {
      onUpdate(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUpdate();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
          className="sr-only"
        />
        <div className={`w-5 h-5 border-2 border-white rounded flex items-center justify-center transition-colors ${
          todo.completed ? 'bg-white bg-opacity-30' : 'bg-transparent'
        }`}>
          {todo.completed && <Check className="w-3 h-3 text-white" />}
        </div>
      </label>
      
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleUpdate}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-white bg-opacity-30 text-white placeholder-white placeholder-opacity-70 px-3 py-1 rounded border-none outline-none"
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 text-white transition-all ${
            todo.completed
              ? 'line-through opacity-70'
              : 'opacity-100'
          }`}
        >
          {todo.text}
        </span>
      )}
      
      <div className="flex items-center gap-2">
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
          >
            <Edit2 className="w-4 h-4 text-white opacity-70" />
          </button>
        )}
        <button
          onClick={() => onDelete(todo.id)}
          className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
        >
          <X className="w-4 h-4 text-white opacity-70" />
        </button>
      </div>
    </div>
  );
};

interface AddTodoProps {
  onAddTodo: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAddTodo }) => {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = () => {
    if (newTodo.trim()) {
      onAddTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-white text-lg font-medium mb-3 opacity-90">
        Add to the todo list
      </h3>
      <div className="flex gap-3">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Learn React"
          className="flex-1 px-4 py-3 bg-white bg-opacity-20 text-white placeholder-white placeholder-opacity-60 rounded-lg border-none outline-none backdrop-blur-sm"
        />
        <button
          onClick={handleSubmit}
          className="px-6 py-3 bg-white bg-opacity-30 text-white rounded-lg hover:bg-opacity-40 transition-colors font-medium backdrop-blur-sm"
        >
          ADD ITEM
        </button>
      </div>
    </div>
  );
};

interface TodoStatsProps {
  totalTodos: number;
  completedTodos: number;
  showCompleted: boolean;
  onToggleShowCompleted: (show: boolean) => void;
}

const TodoStats: React.FC<TodoStatsProps> = ({ 
  totalTodos, 
  completedTodos, 
  showCompleted, 
  onToggleShowCompleted 
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-white text-xl font-medium">Code a todo list</h2>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white bg-opacity-30 rounded border-2 border-white"></div>
            <div className="w-4 h-4 bg-white bg-opacity-60 rounded"></div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-white text-sm opacity-80">
          Move done items at the end
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={(e) => onToggleShowCompleted(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-white bg-opacity-30 rounded-full peer peer-checked:bg-white peer-checked:bg-opacity-50 transition-colors">
            <div className={`absolute top-0.5 left-0.5 bg-white rounded-full h-5 w-5 transition-transform ${
              showCompleted ? 'translate-x-5' : 'translate-x-0'
            }`}></div>
          </div>
        </label>
      </div>
    </div>
  );
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React', completed: false, createdAt: new Date() },
    { id: 2, text: 'Learn ReactJS', completed: true, createdAt: new Date() }
  ]);
  const [showCompleted, setShowCompleted] = useState(true);

  // Load data từ localStorage khi component mount
  useEffect(() => {
    const savedTodos = window.localStorage?.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        setTodos(parsedTodos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        })));
      } catch (error) {
        console.error('Error loading todos from localStorage:', error);
      }
    }
  }, []);

  // Lưu data vào localStorage khi todos thay đổi
  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        window.localStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.error('Error saving todos to localStorage:', error);
      }
    }
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date()
    };
    setTodos(prev => [...prev, newTodo]);
  };

  const toggleComplete = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: number, newText: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // Sắp xếp todos: incomplete trước, completed sau (nếu showCompleted = true)
  const sortedTodos = [...todos].sort((a, b) => {
    if (showCompleted) {
      if (a.completed === b.completed) {
        return a.createdAt.getTime() - b.createdAt.getTime();
      }
      return a.completed ? 1 : -1;
    }
    return a.createdAt.getTime() - b.createdAt.getTime();
  });

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-400 to-orange-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gradient-to-b from-red-400 to-pink-500 p-8 rounded-2xl shadow-2xl backdrop-blur-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Todo List</h1>
            <p className="text-white opacity-80 text-sm">
              Get things done, one item at a time
            </p>
          </div>

          {/* Stats */}
          <TodoStats
            totalTodos={todos.length}
            completedTodos={completedCount}
            showCompleted={showCompleted}
            onToggleShowCompleted={setShowCompleted}
          />

          {/* Add Todo */}
          <AddTodo onAddTodo={addTodo} />

          {/* Todo List */}
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {sortedTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggleComplete={toggleComplete}
                onDelete={deleteTodo}
                onUpdate={updateTodo}
              />
            ))}
            {todos.length === 0 && (
              <div className="text-center py-8">
                <div className="text-white opacity-60 text-lg mb-2">📝</div>
                <p className="text-white opacity-60">No todos yet. Add one above!</p>
              </div>
            )}
          </div>

          {/* Footer Stats */}
          {todos.length > 0 && (
            <div className="mt-6 pt-4 border-t border-white border-opacity-20">
              <div className="flex justify-between text-white text-sm opacity-80">
                <span>{todos.length - completedCount} remaining</span>
                <span>{completedCount} completed</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;