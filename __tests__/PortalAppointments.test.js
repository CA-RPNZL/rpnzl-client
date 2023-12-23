import React from 'react';
import { render } from '@testing-library/react';
import PortalAppointments from '../src/components/PortalAppointments';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock react-router-dom module
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => jest.fn(),
  }));
  
  describe('PortalAppointments Component', () => {
    it('renders without crashing', () => {
      render(
        <Router>
          <PortalAppointments />
        </Router>
      );

    });
  });