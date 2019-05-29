import * as React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import App, { incrementCount } from '../App';

// // Basic unit test
test('incrementCount should increment count on state', () => {
  let initialState = { count: 5 };
  let nextState = incrementCount(initialState);
  expect(nextState.count).toEqual(6);
});

// // Snapshot test
test('should render', () => {
  expect(render(<App />).toJSON()).toMatchSnapshot();
});

// Interact with a rendered component
test('should increase count on click', () => {
  const { getByTestId, getByText } = render(<App />);
  expect(getByTestId('counter').props.children).toEqual(0);
  fireEvent.press(getByText('Increase'));
  expect(getByTestId('counter').props.children).toEqual(1);
});

// // Use mocks to test that props are invoked correctly
test('should fire onCountIncreased callback', () => {
  let onCountIncreased = jest.fn();
  const { getByTestId, getByText } = render(
    <App onCountIncreased={onCountIncreased} />
  );
  fireEvent.press(getByText('Increase'));
  fireEvent.press(getByText('Increase'));
  expect(onCountIncreased).toHaveBeenCalledTimes(2);
  expect(onCountIncreased).toHaveBeenNthCalledWith(1, 1);
  expect(onCountIncreased).toHaveBeenNthCalledWith(2, 2);
});
