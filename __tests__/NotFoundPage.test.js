import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../src/pages/NotFound';

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