import { useState } from "react";
import { useEffect } from "react";
import { apiUrl } from "./api";



export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
  const fetchTodos = async () => {
    const email = localStorage.getItem("email");

    const res = await fetch(apiUrl(`/todos/${email}`));
    const data = await res.json();

    setTodos(data);
  };

  fetchTodos();
}, []);

 const addTodo = async () => {
  if (!input.trim()) return;

  const email = localStorage.getItem("email");

  const res = await fetch(apiUrl("/todos"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, text: input }),
  });

  const newTodo = await res.json();

  setTodos([...todos, newTodo]);
  setInput("");
};

 const toggleTodo = async (id) => {
  const res = await fetch(apiUrl(`/todos/${id}`), {
    method: "PUT",
  });

  const updated = await res.json();

  setTodos(todos.map(t => t._id === id ? updated : t));
};
  const deleteTodo = async (id) => {
  await fetch(apiUrl(`/todos/${id}`), {
    method: "DELETE",
  });

  setTodos(todos.filter(t => t._id !== id));
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-6">
        
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          ✨ My Todo List
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={addTodo}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Add
          </button>
        </div>

        {/* List */}
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:shadow-md transition"
            >
              <span
                onClick={() => toggleTodo(todo._id)}
                className={`flex-1 cursor-pointer ${
                  todo.done
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {todo.text}
              </span>

              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        {/* Empty state */}
        {todos.length === 0 && (
          <p className="text-gray-400 text-center mt-4">
            No tasks yet. Add something 🚀
          </p>
        )}
      </div>
    </div>
  );
}