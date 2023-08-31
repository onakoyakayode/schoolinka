import React, { useState } from "react";
import Todo from "./Todo";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface TodoItem {
  id: number;
  text: string;
  title: string;
}

interface TodoListProps {
  todos: TodoItem[];
  setTodos: React.Dispatch<React.SetStateAction<TodoItem[]>>;
  onEdit: (editedTodo: TodoItem) => void;
  onDelete: (todoId: number) => void;
  itemsPerPage: number;
  viewAllTodos: any;
  listAllTodos: TodoItem[];
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodos,
  onEdit,
  onDelete,
  itemsPerPage,
  viewAllTodos,
  listAllTodos,
}) => {
  const [viewAll, setViewAll] = useState<Boolean>(false);

  const handlePagination = () => {
    setViewAll(false);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(todos.length * itemsPerPage);
  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleToDoEdit = (editedTodo: TodoItem) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === editedTodo.id ? editedTodo : todo
    );
    setTodos(updatedTodos);
  };
  const handleTodoDelete = (todoId: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    setTodos(updatedTodos);
  };

  const handleViewAll = () => {
    viewAllTodos();
    setViewAll(true);
  };

  return (
    <>
      <ul className="mt-[20px] mb-10">
        {!viewAll ? (
          <div>
            {currentTodos.map((todo, index) => (
              <Todo
                key={todo.id}
                todo={todo}
                onEdit={handleToDoEdit}
                onDelete={handleTodoDelete}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div>
            {listAllTodos.map((todo, index) => (
              <Todo
                key={todo.id}
                todo={todo}
                onEdit={handleToDoEdit}
                onDelete={handleTodoDelete}
                index={index}
              />
            ))}
          </div>
        )}
      </ul>
      <div className="mt-[40px] flex justify-between items-center">
        <button
          onClick={handlePrevPage}
          className="hover:text-[#fff] hover:bg-black py-[1px] px-[1px] rounded-[2px] flex justify-center items-center"
        >
          <KeyboardArrowLeftIcon />
        </button>
        <span className="text-[14px]">{currentPage}</span>
        <button
          onClick={handleNextPage}
          className="hover:text-[#fff] hover:bg-black py-[1px] px-[1px] rounded-[2px] flex justify-center items-center"
        >
          <KeyboardArrowRightIcon />
        </button>
      </div>
      <div className="flex justify-center items-center">
        {!viewAll ? (
          <button
            onClick={handleViewAll}
            className={`mt-[30px] mb-3 ${
              viewAll
                ? "bg-[#000] text-[#fff] px-2 py-2"
                : "bg-[grey] text-[#fff] px-2 py-2"
            }`}
          >
            View all
          </button>
        ) : (
          <button
            onClick={handlePagination}
            className={`mt-[30px] mb-3 ${
              viewAll
                ? "bg-[#000] text-[#fff] px-2 py-2"
                : "bg-[grey] text-[#fff] px-2 py-2"
            }`}
          >
            paginate
          </button>
        )}
      </div>
    </>
  );
};

export default TodoList;
