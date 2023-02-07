import { atomWithStorage } from 'jotai/utils';
import { Todo } from './types';

const todosAtom = atomWithStorage<Todo[]>('todos', []);

export default todosAtom;
