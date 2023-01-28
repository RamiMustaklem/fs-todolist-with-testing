import { useState } from 'react';

type Props = {
  id: number;
  text: string;
  complete: boolean;
};

function TodoItem({ id, text, complete }: Props) {
  const [isComplete, setIsComplete] = useState(complete);

  return (
    <div className="flex">
      <label
        htmlFor={`todo-${id}-complete-toggle`}
        className="flex items-center space-x-4"
      >
        <input
          type="checkbox"
          id={`todo-${id}-complete-toggle`}
          onChange={(event) => setIsComplete(event.target.checked)}
          checked={isComplete}
          className="w-6 h-6 rounded"
          aria-label="todo item toggle"
        />
        <p
          className={`font-semibold text-lg ${
            isComplete ? 'line-through' : ''
          }`}
        >
          {text}
        </p>
      </label>
    </div>
  );
}

export default TodoItem;
