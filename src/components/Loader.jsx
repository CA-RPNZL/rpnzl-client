import "../styling/Loader.css"
import { ThreeDots } from 'react-loader-spinner';

// Loader component to display a loading spinner
function Loader({ open }) {
    // If the 'open' prop is false, render nothing
    if (!open) {
        return null;
    }

    // If the 'open' prop is true, render the loader with a spinning three dots animation
    return (
        <div id="overlay">
            <div id="loaderContainer">
                {/* Using the ThreeDots component with specified properties */}
                <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="#D51E01"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                />
            </div>
        </div>
    );
}

export default Loader;
