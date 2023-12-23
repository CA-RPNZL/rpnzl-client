import React from 'react';
import { render } from '@testing-library/react';
import ServicesCard from '../src/components/ServicesCard';

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