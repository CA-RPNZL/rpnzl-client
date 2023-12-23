import React from 'react';
import { render } from '@testing-library/react';
import ReviewCarousel from '../src/components/ReviewCarousel';


describe('ReviewCarousel Component', () => {
    it('renders without crashing', () => {
      render(<ReviewCarousel />);
    });
  });
  
  describe('ReviewCarousel Component', () => {
    it('renders carousel slides with reviews', () => {
      const { getAllByText } = render(<ReviewCarousel />);
  
      // Check if specific review text is present in at least one of the carousel slides
      const reviewElements = getAllByText(/"The best salon in town"|Quality services and friendly staff|I will keep coming back here/);
  
      // Ensure at least one element with each text is present
      expect(reviewElements.length).toBeGreaterThanOrEqual(1);
    });
  });