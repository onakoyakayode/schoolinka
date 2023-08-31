import React, { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./Todo/TodoList";
import axios from "axios";

interface TodoItem {
  id: number;
  text: string;
  title: string;
}

function App() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputText, setInputText] = useState("");
  const [listAll, setListAll] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setTodos(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const allTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      setListAll(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const addToDo = () => {
    if (inputText.trim() !== "") {
      const newTodo: TodoItem = {
        id: todos.length + 1,
        text: inputText,
        title: inputText,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      setInputText("");
    }
  };

  const handleToEdit = (editedTodo: TodoItem) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editedTodo.id ? editedTodo : todo
    );
    setTodos(updatedTodos);
  };

  const handleToDelete = (todoId: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };
  return (
    <div className="w-[100%] flex justify-center items-center">
      <div className="shadow-md w-[100%] md:w-[600px] px-5 py-8 h-auto">
        <h1 className="text-[2rem] text-[red]">Todo List</h1>
        <div className="flex justify-start items-center mt-[20px] gap-4 h-12">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="border border-1 border-[#909090] rounded-[10px] w-[70%] h-[100%] focus:outline-none px-2"
          />
          <button
            onClick={addToDo}
            className="w-[30%] h-[100%] rounded-[10px] bg-[#DB2B39] text-[#fff] text-[1rem] font-medium"
          >
            Add Todo
          </button>
        </div>
        <TodoList
          todos={todos}
          setTodos={setTodos}
          onEdit={handleToEdit}
          onDelete={handleToDelete}
          itemsPerPage={itemsPerPage}
          listAllTodos={listAll}
          viewAllTodos={allTodos}
        />
      </div>
    </div>
  );
}

export default App;
