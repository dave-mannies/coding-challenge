
import {render, screen} from '@testing-library/react';
import App from '../app/App';

describe('Layout using App for routing', () => {
  it('renders', () => {
    render(<App  />);

    expect(screen.getByText(/coding challenge/i)).toBeDefined();
    expect(screen.getByText(/Tracking/i)).toBeDefined();
    expect(screen.getByText(/Reports/i)).toBeDefined();
    expect(screen.getByText(/History/i)).toBeDefined();
  });
})
