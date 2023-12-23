import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import SignUp from '../src/pages/SignUp';
import axios from 'axios';
import { render, fireEvent } from '@testing-library/react';

jest.mock('axios');

describe('SignUp component', () => {
  test('renders signup form and handles signup', async () => {
    const { queryAllByText, getByLabelText, getByText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    // Check if there is only one element with the text "Sign-up"
    const signUpElements = queryAllByText('Sign-up');
    expect(signUpElements).toHaveLength(1);

    // Check if the form and its elements are rendered
    expect(getByLabelText('First Name:')).toBeInTheDocument();
    expect(getByLabelText('Last Name:')).toBeInTheDocument();
    expect(getByLabelText('Email Address:')).toBeInTheDocument();
    expect(getByLabelText('Mobile Number:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
    expect(getByLabelText('Confirm Password:')).toBeInTheDocument();

    // Mock the API response for successful signup
    axios.post.mockResolvedValueOnce({
      data: {
        message: 'User signed up successfully',
      },
    });

    // Simulate user input and submit the form
    fireEvent.change(getByLabelText('First Name:'), { target: { value: 'John' } });
    fireEvent.change(getByLabelText('Last Name:'), { target: { value: 'Doe' } });
    fireEvent.change(getByLabelText('Email Address:'), { target: { value: 'john@example.com' } });
    fireEvent.change(getByLabelText('Mobile Number:'), { target: { value: '1234567890' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'password123' } });
    fireEvent.change(getByLabelText('Confirm Password:'), { target: { value: 'password123' } });

    // Click the "Sign up" button
    fireEvent.click(getByText('Sign up'));

  });
});