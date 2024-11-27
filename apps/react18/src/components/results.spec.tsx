import ResultsView from './resultsView';
import {render, screen} from '@testing-library/react';

export const result = {
  id: 1,
  date: new Date(),
  deliverees: 1,
  housesCount: 2,
  pizzasCount: 3,
  grid: [],
  analysis: [],
}

describe('results', () => {
  it('renders', () => {
    render(<ResultsView result={result} />);

    expect(screen.getByText('Id:')).toBeDefined();
    expect(screen.getByText('Date:')).toBeDefined();
    expect(screen.getByText('Deliverees:')).toBeDefined();
    expect(screen.getByText('Pizzas:')).toBeDefined();
    expect(screen.getByText('Houses:')).toBeDefined();
  });
})
