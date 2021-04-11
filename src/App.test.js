import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import {replaceCamelWithSpaces} from './App';

test('button correct inital color', () => {
  render(<App />)
  const button = screen.getByRole('button', {name: /change to blue/i });
  expect(button).toHaveStyle({backgroundColor: 'red'});
  
});

test('button turns blue when clicked', () => {
  render(<App />)
  const button = screen.getByRole('button', {name: /change to blue/i });
  fireEvent.click(button);
  expect(button).toHaveStyle({backgroundColor: 'blue'});
});

test('button text changes to blue upon click', () => {
  render(<App />)
  const button = screen.getByRole('button', {name: /change to blue/i });
  fireEvent.click(button);
  expect(button.textContent).toBe('Change to red');
});

test('button is enabled, checkbox unchecked', () => {
  render(<App />)
  const button = screen.getByRole('button', {name: /change to blue/i });
  expect(button).toBeEnabled();

  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
});

test('button disable upon checkbox', () => {
  render(<App />)
  const checkbox = screen.getByRole('checkbox', {name: /disable button/i});
  const button = screen.getByRole('button', {name: /change to blue/i });
  
  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
  

});

test('button when disabled turns gray, then reverts back to red', () => {
  render(<App />)
  const checkbox = screen.getByRole('checkbox', {name: /disable button/i});
  const button = screen.getByRole('button', {name: /change to blue/i });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor: 'gray'});
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor: 'red'});
});

test('button when disabled turns gray, then reverts back to blue', () => {
  render(<App />)
  const checkbox = screen.getByRole('checkbox', {name: /disable button/i});
  const button = screen.getByRole('button', {name: /change to blue/i });

  fireEvent.click(button);

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor: 'gray'});
  fireEvent.click(checkbox);
  expect(button).toHaveStyle({backgroundColor: 'blue'});
});

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red');
  });

  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
  });
  test('works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });

});