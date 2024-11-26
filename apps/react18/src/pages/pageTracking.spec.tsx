
import {render, screen} from '@testing-library/react';
import PageTracking from './pageTracking';

describe('PageTracking', () => {
  it('renders', () => {
    render(<PageTracking />);

    expect(screen.getByText(/Tracking/)).toBeDefined();
  });
})
