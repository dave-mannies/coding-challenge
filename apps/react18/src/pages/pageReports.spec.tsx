
import {render, screen} from '@testing-library/react';
import PageReports from './pageReports';

describe('PageReports', () => {
  it('renders', () => {
    render(<PageReports />);

    expect(screen.getByText(/Reports/)).toBeDefined();
  });
})
