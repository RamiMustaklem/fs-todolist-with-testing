import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import TodoItem from '../components/TodoItem';

describe('Test <TodoItem />', () => {
  it('should render the todo item text', () => {
    render(<TodoItem id={123} text="random todo text" complete={false} />);

    expect(screen.getByText('random todo text')).toBeInTheDocument();
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(screen.getByTestId('edit-button')).toBeInTheDocument();
    expect(screen.getByTestId('delete-button')).toBeInTheDocument();
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

  it('should show text input when edit is clicked', () => {
    render(<TodoItem id={123} text="random todo text" complete={false} />);

    const p = screen.getByText('random todo text');
    expect(p).toBeInTheDocument();

    const editButton = screen.getByTestId('edit-button');
    expect(editButton).toBeInTheDocument();

    fireEvent.click(editButton);

    expect(editButton).toBeDisabled();
    expect(p).not.toBeInTheDocument();

    const textInput = screen.getByDisplayValue('random todo text');
    expect(textInput).toBeInTheDocument();

    const submit = screen.getByTestId('submit-button');
    expect(submit).toBeInTheDocument();

    fireEvent.change(textInput, { target: { value: 'new text' } });

    fireEvent.click(submit);

    const newP = screen.getByText('new text');
    expect(newP).toBeInTheDocument();
    expect(newP.nodeName).toBe('P');
    expect(newP).toHaveTextContent('new text');
    expect(submit).not.toBeInTheDocument();
  });
});
