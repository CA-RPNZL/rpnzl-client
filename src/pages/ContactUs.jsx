import BookNowButton from "../components/BookNowButton";
import buildingPhoto from '../assets/photos/contactus_image.jpg';
import "../styling/ContactUs.css"

function ContactUs() {
    return (
        <div id="contactPageContainer">
            <div className="imageContainer">
                <img src={buildingPhoto} />
            </div>
            <div className="whiteContainer">
                <h3 className="heading">Get in touch</h3>
                <h6 className="subheading">We would love to hear from you</h6>
                <div className="greenContainer">
                    <h5 id="blackLogo">RPNZL</h5>
                    <table>
                        <tbody>
                            <tr>
                                <td>Phone:</td>
                                <td>0423 987 654</td>
                            </tr>
                            <tr>
                                <td>Address:<br/></td>
                                <td>Level 2, 12 Hair St<br/>
                                    Sydney, NSW</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>rpnzlhair@gmail.com</td>
                            </tr>
                        </tbody>  
                    </table>
                </div>
                <div id="buttonContainer">
                    <BookNowButton />
                </div>
            </div> 
        </div>
    )
}

export default ContactUs;