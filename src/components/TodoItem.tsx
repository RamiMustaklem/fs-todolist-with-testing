import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import todosAtom from '../todosAtom';
import { Todo } from '../types';

import { ReactComponent as EditIcon } from '../assets/edit.svg';
import { ReactComponent as DeleteIcon } from '../assets/trash.svg';
import { ReactComponent as SubmitIcon } from '../assets/check-circle.svg';

type Props = Todo;

interface CustomElement extends HTMLFormElement {
  todo: HTMLInputElement;
}

function TodoItem({ id, text, complete }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const todos = useAtomValue(todosAtom);
  const setTodos = useSetAtom(todosAtom);

  const inputRef = useRef<HTMLInputElement>(null);

  const onFormSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as CustomElement;
    const newText = target.todo.value;
    // send to api
    setIsEditing(false);
    const idx = todos.findIndex((t) => t.id === id);
    const newArr = [...todos];
    newArr.splice(idx, 1, {
      id,
      text: newText,
      complete,
    });
    setTodos(newArr);
  };

  const deleteTodoHandler = () => {
    // send delete todo to api
    const idx = todos.findIndex((t) => t.id === id);
    const newArr = [...todos];
    newArr.splice(idx, 1);
    setTodos(newArr);
  };

  const toggleComplete = (event: ChangeEvent<HTMLInputElement>) => {
    const idx = todos.findIndex((t) => t.id === id);
    const newArr = [...todos];
    newArr.splice(idx, 1, {
      id,
      text,
      complete: event.target.checked,
    });
    setTodos(newArr);
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
          onChange={(event) => toggleComplete(event)}
          checked={complete}
          className="w-6 h-6 rounded"
          aria-label="todo item toggle"
        />
        {isEditing ? (
          <form
            onSubmit={onFormSubmitHandler}
            className="flex-1 flex items-center space-x-4"
          >
            <input
              ref={inputRef}
              name="todo"
              type="text"
              defaultValue={text}
              className="h-7 rounded flex-1"
            />
            <button
              type="submit"
              className="text-blue-500"
              data-testid="submit-button"
            >
              <SubmitIcon />
            </button>
          </form>
        ) : (
          <p
            className={`font-semibold text-lg${
              complete ? ' line-through' : ''
            }`}
          >
            {text}
          </p>
        )}
      </label>

      <div className="space-x-3 flex items-center ml-10">
        <button
          type="button"
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 1);
          }}
          disabled={isEditing}
          className="text-blue-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:text-gray-400"
          data-testid="edit-button"
        >
          <EditIcon />
        </button>

        <button
          type="button"
          disabled={isEditing}
          className="text-red-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:text-gray-400"
          onClick={deleteTodoHandler}
          data-testid="delete-button"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
