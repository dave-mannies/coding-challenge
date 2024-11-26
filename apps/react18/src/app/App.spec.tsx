import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


describe('App-mui', () => {
  it('renders', () => {
    render(<App />);
    const text = screen.getByText(/coding/i);
    expect(text).toBeInTheDocument();
  });
});
