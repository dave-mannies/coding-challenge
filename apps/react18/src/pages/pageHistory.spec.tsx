
import {fireEvent, render, screen} from '@testing-library/react';
import PageHistory from './pageHistory';

describe('PageHistory', () => {
  it('renders', () => {
    render(<PageHistory />);

    expect(screen.getByText(/Cards/)).toBeDefined();
    expect(screen.getByText(/Table/)).toBeDefined();
  });

  it('selects CARDS', () => {
    render(<PageHistory />);

    const cardsButton = screen.getByTestId('cards');
    const tableButton = screen.getByTestId('table');

    expect(cardsButton).toBeDefined();
    expect(tableButton).toBeDefined();

    fireEvent.click(tableButton);
    fireEvent.click(cardsButton);

    expect(cardsButton).toHaveClass(/contained/);
    expect(tableButton).toHaveClass(/outlined/);
    expect(screen.getAllByText(/Date:/).length).toBe(5);
  });

  it('selects TABLE', () => {
    render(<PageHistory />);

    const cardsButton = screen.getByTestId('cards');
    const tableButton = screen.getByTestId('table');

    expect(cardsButton).toBeDefined();
    expect(tableButton).toBeDefined();

    fireEvent.click(tableButton);

    expect(cardsButton).toHaveClass(/outlined/);
    expect(tableButton).toHaveClass(/contained/);
    expect(screen.getAllByText(/Date/).length).toBe(1);
  });
})
