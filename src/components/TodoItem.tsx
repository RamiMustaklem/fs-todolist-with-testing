import { useState } from 'react';

import { ReactComponent as EditIcon } from '../assets/edit.svg';
import { ReactComponent as DeleteIcon } from '../assets/trash.svg';
import { ReactComponent as SubmitIcon } from '../assets/check-circle.svg';

type Props = {
  id: number;
  text: string;
  complete: boolean;
};

function TodoItem({ id, text, complete }: Props) {
  const [isComplete, setIsComplete] = useState(complete);
  const [todoText, setTodoText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);

  const onFormSubmitHandler = () => {
    // send to api
    setIsEditing(false);
  };

  const deleteTodoHandler = () => {
    // send delete todo to api
  };

  return (
    <div className="flex">
      <label
        htmlFor={`todo-${id}-complete-toggle`}
        className="flex items-center space-x-4 cursor-pointer flex-1"
      >
        <input
          type="checkbox"
          id={`todo-${id}-complete-toggle`}
          onChange={(event) => setIsComplete(event.target.checked)}
          checked={isComplete}
          className="w-6 h-6 rounded"
          aria-label="todo item toggle"
        />
        {isEditing ? (
          <form
            onSubmit={onFormSubmitHandler}
            className="flex-1 flex items-center space-x-4"
          >
            <input
              type="text"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              className="h-7 rounded flex-1"
            />
            <button type="submit" className="text-blue-500">
              <SubmitIcon />
            </button>
          </form>
        ) : (
          <p
            className={`font-semibold text-lg${
              isComplete ? ' line-through' : ''
            }`}
          >
            {todoText}
          </p>
        )}
      </label>

      <div className="space-x-3 flex items-center ml-10">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          disabled={isEditing}
          className="text-blue-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:text-gray-400"
        >
          <EditIcon />
        </button>

        <button
          type="button"
          disabled={isEditing}
          className="text-red-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:text-gray-400"
          onClick={deleteTodoHandler}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
