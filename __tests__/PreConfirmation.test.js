import React from 'react';
import { render, screen } from '@testing-library/react';
import PreConfirmation from '../src/components/PreConfirmation';
import { AppointmentProvider } from '../src/contexts/AppointmentContext';



jest.mock('../src/contexts/AppointmentContext', () => ({
    ...jest.requireActual('../src/contexts/AppointmentContext'),
    useContext: jest.fn(),
  }));
  
  describe('PreConfirmation Component', () => {
    test('renders with appointment data', () => {
      // Mock the context data
      const mockAppointment = {
        client: '123', // Add necessary properties for your context
        selectedService: { name: 'Haircut' },
        selectedHairstylist: { firstName: 'John', lastName: 'Doe' },
        selectedStartDateTime: new Date('2023-01-01T12:00:00Z'),
        selectedEndDateTime: new Date('2023-01-01T13:00:00Z'),
      };
  
      // Mock the useContext hook
      jest.spyOn(React, 'useContext').mockReturnValue(mockAppointment);
  
      // Render the component within the AppointmentProvider
      render(
        <AppointmentProvider>
          <PreConfirmation />
        </AppointmentProvider>
      );
  
      // You can add specific checks for elements in your PreConfirmation component here
      // Example: Check if the selected service is displayed
      const serviceElement = screen.getByText('Services');
      expect(serviceElement).toBeInTheDocument();
  
      // Example: Check if the selected hairstylist is displayed
      const hairstylistElement = screen.getByText('Hairstylist');
      expect(hairstylistElement).toBeInTheDocument();
  
      // Example: Check if the selected date and time are displayed
      const dateTimeElement = screen.getByText('Date and time');
      expect(dateTimeElement).toBeInTheDocument();
  
      // You can add more specific checks based on your component structure and content
    });
  });