import { Button } from "react-bootstrap";
import "../styling/WhiteButton.css";

function WhiteButton(props) {
    return (
        <div id="whiteBtn">
            <Button className="whiteButton" onClick={props.action} disabled={props.disabled}>{props.label}</Button>
        </div>
    )

}

export default WhiteButton;