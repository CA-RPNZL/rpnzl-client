import React from 'react';
import '../styling/NotFound.css';

function NotFound() {
    return (
        <div id="notFoundContainer" data-testid="notFoundContainer">
            <div id="pinkContainer">
                <h1>Error</h1>
                <p>Uh-oh! Page not found.</p>
            </div>
        </div>
    )
}

export default NotFound;
