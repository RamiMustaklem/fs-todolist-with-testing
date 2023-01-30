import { Todo } from '../types';
import TodoItem from './TodoItem';

type Props = {
  todos?: Todo[];
};

function TodoList({ todos = [] }: Props) {
  return (
    <div className="space-y-4">
      {todos?.map((x) => (
        <TodoItem
          key={`todo-item-${x}`}
          id={x.id}
          text="todo item"
          complete={false}
        />
      ))}
    </div>
  );
}

TodoList.defaultProps = { todos: [] };

export default TodoList;
