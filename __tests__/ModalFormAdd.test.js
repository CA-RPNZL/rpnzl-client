import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ModalForm from '../src/components/ModalFormAdd';

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