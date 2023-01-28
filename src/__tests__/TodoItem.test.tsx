import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import TodoItem from '../components/TodoItem';

describe('Test <TodoItem />', () => {
  it('should render the todo item text', () => {
    render(<TodoItem id={123} text="random todo text" complete={false} />);

    expect(screen.getByText('random todo text')).toBeInTheDocument();
  });

  it('should render the todo item text with strikethrough when complete', () => {
    render(<TodoItem id={123} text="random todo text" complete />);

    const el = screen.getByText('random todo text');
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('line-through');
  });

  it('should change the todo item complete value when clicked', () => {
    render(<TodoItem id={123} text="random todo text" complete={false} />);

    const el = screen.getByText('random todo text');
    expect(el).toBeInTheDocument();
    expect(el).not.toHaveClass('line-through');

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveProperty('checked', false);

    fireEvent.click(el);

    expect(el).toHaveClass('line-through');
    expect(checkbox).toHaveProperty('checked', true);
  });
});
