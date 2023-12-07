import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function BackButton() {
    const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}

    return (
        <div id="backBtnDiv">
            <Button className="whiteButton" onClick={goBack}>Back</Button>
        </div>
    )
}

export default BackButton;