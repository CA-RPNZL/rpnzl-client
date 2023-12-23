import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import UsersTab from '../src/components/AdminUsersTab';

describe('UsersTab component', () => {
    test('renders the component and handles button clicks', () => {
      // Mock functions for update and delete
      const mockUpdate = jest.fn();
      const mockDelete = jest.fn();
  
      // Render the component with sample props and mock functions
      const { getByText } = render(
        <UsersTab
          firstName="John"
          lastName="Doe"
          mobileNumber="1234567890"
          email="john.doe@example.com"
          is_hairstylist={true}
          services={['Haircut', 'Coloring']}
          onUpdate={mockUpdate}
          onDelete={mockDelete}
        />
      );
  
      // Assert that the component renders the user information correctly
      expect(getByText('John Doe')).toBeInTheDocument();
      expect(getByText('1234567890')).toBeInTheDocument();
      expect(getByText('john.doe@example.com')).toBeInTheDocument();
  
      // Simulate a button click and assert that the corresponding function is called
      fireEvent.click(getByText('Update'));
      expect(mockUpdate).toHaveBeenCalledTimes(1);
  
      // Simulate another button click and assert that the corresponding function is called
      fireEvent.click(getByText('Delete'));
      expect(mockDelete).toHaveBeenCalledTimes(1);
    });
  });