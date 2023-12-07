import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';


function UserPortal() {
    return (
        <div>
            <div>
                <div className="profileIcon">
                    <FontAwesomeIcon icon={faUser} size="2xl"/>
                </div>
                <h5>Hello, Michelle</h5>
            </div>
        </div>
    )
}
export default UserPortal