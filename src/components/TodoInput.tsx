import { FormEvent } from 'react';
import { useSetAtom, useAtomValue } from 'jotai';
import { Todo } from '../types';
import todosAtom from '../todosAtom';

interface FormElements extends HTMLFormElement {
  todo: HTMLInputElement;
}

function TodoInput() {
  const todos = useAtomValue<Todo[]>(todosAtom);
  const setTodos = useSetAtom(todosAtom);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    const target = e.target as FormElements;
    e.preventDefault();
    // submit new todo to api
    setTodos([
      ...(todos || []),
      {
        id: todos?.length ? todos[todos.length - 1].id + 1 : 1,
        text: target.todo.value,
        complete: false,
      },
    ]);
    target.reset();
  };

  return (
    <form onSubmit={onSubmitHandler} className="space-x-4 mb-6 flex">
      <input
        type="text"
        id="todo"
        name="todo"
        className="rounded flex-1"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        required
        maxLength={60}
        minLength={3}
        placeholder="Add your task here"
      />
      <button
        type="submit"
        className="py-2 px-6 rounded bg-blue-600 text-white cursor-pointer"
      >
        Add
      </button>
    </form>
  );
}

export default TodoInput;
