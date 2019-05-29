import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';
import Navigation from '../Navigation';

// Can also interact with navigation. YMMV
test('full app rendering/navigating', async () => {
  const { getAllByText, getByTestId, getByText } = render(<Navigation />);
  expect(getByTestId('title').props.children).toMatch('Home page');
  fireEvent.press(getByText(/go to about/i));
  await expect(getAllByText('About page')).toBeTruthy();
});
