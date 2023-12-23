import React from 'react';
import { render } from '@testing-library/react';
import PersonalDetailsForm from '../src/components/PersonalDetailsForm';
import { BrowserRouter as Router } from 'react-router-dom';


// Mock react-router-dom module
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));
  
  describe('PersonalDetailsForm Component', () => {
    it('renders without crashing', () => {
      render(
        <Router>
          <PersonalDetailsForm />
        </Router>
      );
    });
  });