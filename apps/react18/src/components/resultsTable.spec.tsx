
import {render, screen} from '@testing-library/react';
import ResultsTable from './resultsTable';
import {result} from './results.spec';

describe('results', () => {
  it('renders', () => {
    render(<ResultsTable history={[result]} />);

    expect(screen.getByText('Id')).toBeDefined();
    expect(screen.getByText('Date')).toBeDefined();
    expect(screen.getByText('Deliverees')).toBeDefined();
    expect(screen.getByText('Pizzas')).toBeDefined();
    expect(screen.getByText('Houses')).toBeDefined();
  });
})
