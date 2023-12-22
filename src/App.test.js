import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Loader from '../src/components/Loader';
import ServicesCard from '../src/components/ServicesCard';
import AppointmentsTab from '../src/components/AdminAppointmentsTab';
import ServicesTab from '../src/components/AdminServicesTab';
import NotFound from '../src/pages/NotFound';
import ModalForm from '../src/components/ModalFormAdd';
import { MemoryRouter } from 'react-router-dom';
import SignUp from '../src/pages/SignUp';
import axios from 'axios';




// Loader tests
describe('Loader component', () => {
    test('renders loader when open is true', () => {
    
      // Arrange: Renders the loader component when open is true
      const { getByLabelText } = render(<Loader open={true} />);
  
      // Act: Get the loader element 
      const loaderElement = getByLabelText('three-dots-loading');
  
      // Assert: Ensure Loader copmponent is present
      expect(loaderElement).toBeInTheDocument();
    });
  
    test('does not render loader when open is false', () => {
  
      // Arrange: Renders the loader component when open is false
      const { container } = render(<Loader open={false} />);
  
      // Assert: Ensure the overlay element is not present
      expect(container.querySelector('#overlay')).toBeNull();
    });
  });



// Service Card Test
  describe('ServicesCard component', () => {
    test('renders ServicesCard with correct props', () => {
      // Arrange: Renders the Service Card props
      const props = {
        name: 'Haircut',
        price: '$20',
        duration: 30,
        description: 'A stylish haircut service.',
      };
  
      // Act: render the Service Card
      const { getByText } = render(<ServicesCard {...props} />);
  
      // Assert: Ensure that the rendered component contains the expected text content
      expect(getByText(props.name)).toBeInTheDocument();
      expect(getByText(props.price)).toBeInTheDocument();
      expect(getByText(`Approx time: ${props.duration} mins`)).toBeInTheDocument();
      expect(getByText(props.description)).toBeInTheDocument();
    });
  });



// Appointments Tab Test
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



// Services Tab Test
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



// Page Not Found test
describe('NotFound page', () => {
    test('renders not found message', () => {
      // Arrange: Render not found page
      const { getByText, getByTestId } = render(<NotFound />);
  
      // Assert: chack if expected content is rendered/ check if an attribute is present
      expect(getByTestId('notFoundContainer')).toBeInTheDocument();
      expect(getByText('Error')).toBeInTheDocument();
      expect(getByText('Uh-oh! Page not found.')).toBeInTheDocument();
    });
  });


  
// Modal Add Form test
describe('ModalForm component', () => {
    test('renders modal content when open is true', () => {
      // Arrange
      const mockHandleClick = jest.fn();
  
      // Act
      const { getAllByText, getByRole } = render(
        <ModalForm
          open={true}
          heading="Test Heading"
          subheading="Test Subheading"
          text="Test Text"
          onClose={() => {}}
          handleClick={mockHandleClick}
        >
          <form data-testid="modal-form">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
          </form>
        </ModalForm>
      );
  
      // Assert
      getAllByText('Test Heading').forEach((element) => {
        expect(element).toBeInTheDocument();
      });
      expect(getAllByText('Test Subheading')[0]).toBeInTheDocument(); 
      expect(getAllByText('Test Text')[0]).toBeInTheDocument();
  
      // Use getByRole to specifically target the button
      expect(getByRole('button', { name: 'Test Heading' })).toBeInTheDocument();
  
      // Simulate user interaction
      fireEvent.click(getByRole('button', { name: 'Back' }));
      expect(mockHandleClick).not.toHaveBeenCalled();
    });
  });
  


// Sign Up Test
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
 
    await waitFor(() => {
   
    });
  });
});



// Sign-up Password Validation Test
// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: jest.fn(),
// }));

// describe('SignUp component', () => {
//   test('handles password validation and prevents navigation on failure', async () => {
//     // Mock the useNavigate function
//     const mockNavigate = jest.fn();
//     require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);

//     const { getByLabelText, getAllByText, getByText } = render(<SignUp />);

//     // Simulate user input with a weak password
//     fireEvent.change(getByLabelText('Password:'), { target: { value: 'weak' } });
//     fireEvent.change(getByLabelText('Confirm Password:'), { target: { value: 'weak' } });

//     // Click the "Sign up" button
//     fireEvent.click(getByText('Sign up'));

//     await waitFor(
//       () => {
//         // Assert: useNavigate is not called
//         expect(mockNavigate).not.toHaveBeenCalled();
//       },
//       { timeout: 5000 } 
//     );

//     // Check for the warning message
//     const warningMessage = getAllByText('Password must exceed 8 characters.', { exact: false });
//     expect(warningMessage).toBeInTheDocument();
//   });
// });

























