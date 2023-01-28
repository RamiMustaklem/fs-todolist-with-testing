import TodoList from '../components/TodoList';

function Home() {
  return (
    <div className="min-h-auto max-w-2xl mx-auto bg-gray-100 py-5 px-10 mt-4 rounded shadow-md border border-slate-300">
      <h1 className="text-3xl font-bold text-center mb-4">Todo App</h1>
      <TodoList />
    </div>
  );
}

export default Home;
