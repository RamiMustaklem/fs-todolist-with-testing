import TodoItem from './TodoItem';

function TodoList() {
  return (
    <div className="space-y-4">
      {Array.from(new Array(10))
        .map((_, i) => i + 1)
        .map((x) => (
          <TodoItem
            key={`todo-item-${x}`}
            id={x}
            text="todo item"
            complete={false}
          />
        ))}
    </div>
  );
}

export default TodoList;
