
import {render, screen} from '@testing-library/react';
import Error404 from './error404';

describe('Error404', () => {
  it('renders', () => {
    render(<Error404  />);

    expect(screen.getByText(/404/)).toBeDefined();
  });
})
