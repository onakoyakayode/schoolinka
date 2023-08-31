import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

interface TodoItem {
  id: number;
  text: string;
  title: string;
}

interface TodoProps {
  todo: TodoItem;
  onEdit: (editedTodo: TodoItem) => void;
  onDelete: (todoId: number) => void;
  index: number;
}

const Todo: React.FC<TodoProps> = ({ todo, onEdit, onDelete, index }) => {
  const [isEdititng, setIsEditing] = useState(false);
  //   const [editedText, setEditedText] = useState(todo.text);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onEdit({ ...todo, title: editedTitle });
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <li
      className={`my-[2px] shadow-md w-[100%] py-2 px-3 flex items-center justify-start gap-4 h-13`}
    >
      {isEdititng ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={handleEditChange}
            className={`${
              isEdititng
                ? `w-[80%] h-12 focus:outline-none border-[1px] border-[#a9a9a9] rounded-[5px] px-2`
                : `w-[80%] focus:outline-none border-[1px] border-[#a9a9a9] rounded-[5px]`
            }`}
          />
          <button
            onClick={handleSaveClick}
            className="bg-[#28965A] h-full text-[#fff] py-[12px] px-5 rounded-[4px] w-[30%]"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <span>{todo.id}</span>
          <span className="w-[70%]">{todo.title}</span>
          <button
            onClick={handleEditClick}
            className="h-full bg-[#FFD23F] text-[#fff] py-[12px] px-5 rounded-[4px] w-[10%] flex justify-center items-center"
          >
            <EditIcon className="text-[#FFF]" />
          </button>
        </>
      )}
      <button
        onClick={handleDelete}
        className="h-full bg-[red] text-[#fff] py-[12px] px-5 rounded-[4px] w-[10%] flex justify-center items-center"
      >
        <DeleteOutlineIcon className="text-[#fff]" />
      </button>
    </li>
  );
};

export default Todo;
