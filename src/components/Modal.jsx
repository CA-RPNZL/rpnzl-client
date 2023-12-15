import React, {useState} from 'react'
import { Button } from 'react-bootstrap';
import "../styling/Modal.css"

const Modal = ({action, open, heading, subheading, text, onClose}) => {
    if (!open) {
        return null;
    }
    return (
        <div className="overlay">
            <div className="modalContainer">
                <i onClick={onClose} className="fas fa-times"/>
                <div className="modalContent">
                    <h3>{heading}</h3>
                    <h5> {subheading}</h5>
                    <p>{text}</p>
                </div>
                <div id="modalButtons">
                    <Button onClick={action}>{heading}</Button>
                    <Button onClick={onClose}>Back</Button>
                </div>
            </div>
        </div>
    )
}

export default Modal;