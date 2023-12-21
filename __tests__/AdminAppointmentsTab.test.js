import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AppointmentsTab from '../src/components/AdminAppointmentsTab';

describe('AppointmentsTab component', () => {
    const mockProps = {
      client: { firstName: 'John', lastName: 'Doe' },
      hairstylist: { firstName: 'Jane', lastName: 'Smith' },
      service: { name: 'Haircut' },
      date: '2023-01-01',
      startTime: '12:00 PM',
      duration: '30 minutes',
      onUpdate: jest.fn(),
      onDelete: jest.fn(),
    };
  
    test('renders appointment details and buttons', () => {
      // Arrange: Render the appointmentsTab
      const { getByText, getByRole } = render(<AppointmentsTab {...mockProps} />);
  
      // Assert: Check if the component renders the appointment details
      expect(getByText('John Doe')).toBeInTheDocument();
      expect(getByText('Jane')).toBeInTheDocument(); 
      expect(getByText('Haircut')).toBeInTheDocument();
      expect(getByText('2023-01-01')).toBeInTheDocument();
      expect(getByText('12:00 PM')).toBeInTheDocument();
      expect(getByText('30 minutes')).toBeInTheDocument();
  
      // Assert: Check if the component renders the buttons
      const updateButton = getByRole('button', { name: 'Update' });
      const deleteButton = getByRole('button', { name: 'Delete' });
      expect(updateButton).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
  
      // Act: Click the update button
      fireEvent.click(updateButton);
      // Act: Click the delete button
      fireEvent.click(deleteButton);
  
      // Assert: Check if the onUpdate and onDelete functions were called
      expect(mockProps.onUpdate).toHaveBeenCalled();
      expect(mockProps.onDelete).toHaveBeenCalled();
    });
  });