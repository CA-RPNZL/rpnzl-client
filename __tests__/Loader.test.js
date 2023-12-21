import React from 'react';
import { render } from '@testing-library/react';
import Loader from '../src/components/Loader';

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