import React from 'react';
import { Button } from 'react-bootstrap';
import '../styling/ModalForm.css';

// ModalForm component to display a modal with a form
const ModalForm = ({ open, heading, subheading, text, onClose, handleClick, children }) => {
  // If the 'open' prop is false, render nothing
  if (!open) {
    return null;
  }

  // If the 'open' prop is true, render the modal with specified content and buttons, including the form (children)
  return (
    <div className="overlay">
      <div className="modalContainer">
        {/* Close icon that triggers the onClose function */}
        <i onClick={onClose} className="fas fa-times" />
        <div className="modalContent">
          {/* Heading of the modal */}
          <h3>{heading}</h3>
          {/* Subheading of the modal */}
          <h5> {subheading}</h5>
          {/* Text content of the modal */}
          <p>{text}</p>
        </div>
        <div id="modalButtons">
          {/* Render the form inside the modal */}
          {children}
          {/* Button that triggers the handleClick function */}
          <Button onClick={handleClick}>{heading}</Button>
          {/* Button that triggers the onClose function */}
          <Button onClick={onClose}>Back</Button>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
