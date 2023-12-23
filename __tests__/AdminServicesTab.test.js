import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ServicesTab from '../src/components/AdminServicesTab';

describe('ServicesTab component', () => {
    const mockProps = {
      serviceName: 'Haircut',
      description: 'A great haircut',
      price: '$30',
      duration: '30 minutes',
      onDelete: jest.fn(),
    };
  
    test('renders service details and delete button', () => {
      // Arrange: Renders the Services Tab
      const { getByText, getByRole } = render(<ServicesTab {...mockProps} />);
  
      // Assert: Check if the component renders the service details
      expect(getByText('Haircut')).toBeInTheDocument();
      expect(getByText('A great haircut')).toBeInTheDocument();
      expect(getByText('$30')).toBeInTheDocument();
      expect(getByText('30 minutes')).toBeInTheDocument();
  
      // Assert: Check if the component renders the delete button
      const deleteButton = getByRole('button', { name: 'Delete' });
      expect(deleteButton).toBeInTheDocument();

      // Act: Click the delete button
      fireEvent.click(deleteButton);
  
      // Assert: Check if the onDelete function was called
      expect(mockProps.onDelete).toHaveBeenCalled();
    });
  });
  