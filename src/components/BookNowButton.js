import Button from 'react-bootstrap/Button';
import '../styling/BookNowButton.css';

function BookNowButton() {
    return (
        <div id="bookNowBtnContainer">
            <Button href="/booking" className="bookNowButton">BOOK NOW</Button>
        </div>
    )
}

export default BookNowButton;