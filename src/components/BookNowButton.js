import Button from 'react-bootstrap/Button';
import '../styling/BookNowButton.css';
import { Navigate, useNavigate } from 'react-router-dom';

function BookNowButton() {
    let navigate = useNavigate();

    const handleClick = () => {
        navigate("/booking")
    };

    return (
        <div id="bookNowBtnContainer">
            <Button onClick={handleClick} className="bookNowButton">BOOK NOW</Button>
        </div>
    )
}

export default BookNowButton;