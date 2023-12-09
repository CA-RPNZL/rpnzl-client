import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import "../styling/Greeting.css";

function Greeting() {
    return (
        <div className="greetingDiv">
            <div className="profileIcon">
                <FontAwesomeIcon icon={faCircleUser} size="2xl"/>
            </div>
            <p id="greeting">Hello, Jane</p>

        </div>
    )
}

export default Greeting;