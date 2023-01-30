import { useState, ChangeEvent, FormEvent } from 'react';
import { useLocalStorage } from 'react-use';
import { Todo } from '../types';

function TodoInput() {
  const [value, setValue] = useState('');

  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    // submit new todo to api
    setTodos([
      ...(todos || []),
      { id: todos?.length || 1, text: value, complete: false },
    ]);
    setValue('');
  };

  return (
    <form onSubmit={onSubmitHandler} className="space-x-4 mb-6 flex">
      <input
        type="text"
        value={value}
        onChange={onChangeHandler}
        className="rounded flex-1"
      />
      <button
        type="submit"
        className="py-2 px-6 rounded bg-blue-600 text-white cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={!value}
      >
        Add
      </button>
    </form>
  );
}

export default TodoInput;
