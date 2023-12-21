import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Loader from '../src/components/Loader';
import ServicesCard from '../src/components/ServicesCard';
import AppointmentsTab from '../src/components/AdminAppointmentsTab';
import ServicesTab from '../src/components/AdminServicesTab';
import NotFound from '../src/pages/NotFound';



// Loader
describe('Loader component', () => {
  test('renders loader when open is true', () => {
  
    const { getByLabelText } = render(<Loader open={true} />);

    const loaderElement = getByLabelText('three-dots-loading');

    expect(loaderElement).toBeInTheDocument();
  });

  test('does not render loader when open is false', () => {
    // Arrange
    const { container } = render(<Loader open={false} />);

    expect(container.querySelector('#overlay')).toBeNull();
  });
});

// Services Card
describe('ServicesCard component', () => {
  test('renders ServicesCard with correct props', () => {
    // Arrange
    const props = {
      name: 'Haircut',
      price: '$20',
      duration: 30,
      description: 'A stylish haircut service.',
    };

    // Act
    const { getByText } = render(<ServicesCard {...props} />);

    // Assert
    // Ensure that the rendered component contains the expected text content
    expect(getByText(props.name)).toBeInTheDocument();
    expect(getByText(props.price)).toBeInTheDocument();
    expect(getByText(`Approx time: ${props.duration} mins`)).toBeInTheDocument();
    expect(getByText(props.description)).toBeInTheDocument();
  });
});


// Appointments Tab
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
    // Arrange
    const { getByText, getByRole } = render(<AppointmentsTab {...mockProps} />);

    // Assert
    // Check if the component renders the appointment details
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('Jane')).toBeInTheDocument(); // Assuming you want to test the hairstylist's first name
    expect(getByText('Haircut')).toBeInTheDocument();
    expect(getByText('2023-01-01')).toBeInTheDocument();
    expect(getByText('12:00 PM')).toBeInTheDocument();
    expect(getByText('30 minutes')).toBeInTheDocument();

    // Check if the component renders the buttons
    const updateButton = getByRole('button', { name: 'Update' });
    const deleteButton = getByRole('button', { name: 'Delete' });
    expect(updateButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    // Act
    // Click the update button
    fireEvent.click(updateButton);
    // Click the delete button
    fireEvent.click(deleteButton);

    // Assert
    // Check if the onUpdate and onDelete functions were called
    expect(mockProps.onUpdate).toHaveBeenCalled();
    expect(mockProps.onDelete).toHaveBeenCalled();
  });
});



// Services Tab
describe('ServicesTab component', () => {
  const mockProps = {
    serviceName: 'Haircut',
    description: 'A great haircut',
    price: '$30',
    duration: '30 minutes',
    onDelete: jest.fn(),
  };

  test('renders service details and delete button', () => {
    // Arrange
    const { getByText, getByRole } = render(<ServicesTab {...mockProps} />);

    // Assert
    // Check if the component renders the service details
    expect(getByText('Haircut')).toBeInTheDocument();
    expect(getByText('A great haircut')).toBeInTheDocument();
    expect(getByText('$30')).toBeInTheDocument();
    expect(getByText('30 minutes')).toBeInTheDocument();

    // Check if the component renders the delete button
    const deleteButton = getByRole('button', { name: 'Delete' });
    expect(deleteButton).toBeInTheDocument();

    // Act
    // Click the delete button
    fireEvent.click(deleteButton);

    // Assert
    // Check if the onDelete function was called
    expect(mockProps.onDelete).toHaveBeenCalled();
  });
});


// Page Not Found
describe('NotFound page', () => {
  test('renders not found message', () => {
    // Arrange
    const { getByText, getByTestId } = render(<NotFound />);

    // Assert
    expect(getByTestId('notFoundContainer')).toBeInTheDocument();
    expect(getByText('Error')).toBeInTheDocument();
    expect(getByText('Uh-oh! Page not found.')).toBeInTheDocument();
  });
});




















