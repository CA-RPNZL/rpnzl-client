import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Aboutpage from '../src/pages/About';

describe('Aboutpage', () => {
  it('renders the Aboutpage component', () => {
    render(<Aboutpage />);

    // Check if the main heading is rendered
    const heading = screen.getByText(/About RPNZL/i);
    expect(heading).toBeInTheDocument();

    // Check if the welcome paragraph is rendered
    const welcomeParagraph = screen.getByText(/Welcome to RPNZL/i);
    expect(welcomeParagraph).toBeInTheDocument();

    // Check if the "Book Now" button is rendered
    const bookNowButton = screen.getByText(/Book now/i);
    expect(bookNowButton).toBeInTheDocument();

    // Check if the team image is rendered
    const teamImage = screen.getByAltText(/RPNZLTeam/i);
    expect(teamImage).toBeInTheDocument();

    // Check if the "Meet the RPNZL team" text is rendered
    const meetTeamText = screen.getByText(/Meet the RPNZL team/i);
    expect(meetTeamText).toBeInTheDocument();

    // Check if HairdresserSection is rendered
    const hairdresserSection = screen.getByTestId('hairdresser-section');
    expect(hairdresserSection).toBeInTheDocument();
  });
});

