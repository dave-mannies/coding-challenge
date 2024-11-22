import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App-mui';


describe('App-mui', () => {
  it('renders', () => {
    render(<App />);
    const text = screen.getByText(/material ui/i);
    expect(text).toBeInTheDocument();
  });
});
