import "../styling/Loader.css"
import { ThreeDots } from  'react-loader-spinner';

function Loader({open}) {
    if (!open) {
        return null;
    }
    return (
        <div id="overlay">
            <div id="loaderContainer">
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
    )
}

export default Loader;