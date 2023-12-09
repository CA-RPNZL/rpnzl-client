import React, {useState} from 'react'
import { Button } from 'react-bootstrap';
import "../styling/Modal.css"

const Modal = ({open, onClose}) => {
    if (!open) {
        return null;
    }
    return (
        <div className="overlay">
            <div className="modalContainer">
                    <i onClick={onClose} className="fas fa-times"/>
               <div className="modalContent">
                    <h3>Delete Account</h3>
                    <h5> Are you sure you want to delete your account?</h5>
                    <p>Deleting your account will permanently delete your details and appointments.</p>
                </div>
                <div id="modalButtons">
                    <Button>Delete Account</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </div>

            </div>
        </div>
    )
}

export default Modal;