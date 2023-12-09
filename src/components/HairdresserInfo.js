import React from "react";
import '../styling/HairdresserInfo.css';

function Hairdressers() {
    return (
        <div>
            <div className="hairdresserContent">
                <div className="hairdresserName">
                    <h1>Michelle Smith</h1>
                </div>
                <div className="hairdresserBio">
                    <p>Meet Michelle! With years of experience in the hairdressing world,
                        her journey reflects a dedication to perfecting her craft. Michelle's
                        passion goes beyond hairstyles; it's about creating a personalised 
                        experience for every client. Step into Michelle's chair at RPNZL and
                        let her history in the industry transform your hair.</p>  
                </div>
                <div className="hairdresserService">
                    <p>Michelle is your go-to expert for precision haircuts. With a keen eye 
                        for the latest trends, she crafts styles that perfectly match your 
                        personality. Whether it's a chic bob or a daring pixie cut, Michelle
                        delivers confidence through impeccable cuts.</p>
                </div>
            </div>
            <div className="hairdresserContent">
                <div className="hairdresserName">
                    <h1>Rachel Moss</h1>
                </div>
                <div className="hairdresserBio">
                    <p>Say hi to Rachel! Hailing from America, Rachel brings a wealth of experience
                        from years spent working on movie sets. Her hairstyling journey is intertwined 
                        with the glamour of the film industry, where precision and creativity are 
                        non-negotiable.</p>  
                </div>
                <div className="hairdresserService">
                    <p> Rachel is the master of hair colour transformations. With a keen sense of creativity
                        and a palette of vibrant hues, she specialises in crafting personalised and stunning 
                        hair colours. Whether you're yearning for a bold change, subtle highlights, or a complete
                        transformation, Rachel is your go-to expert.</p>
                </div>
            </div>
            <div className="hairdresserContent">
                <div className="hairdresserName">
                    <h1>Angela Trang</h1>
                </div>
                <div className="hairdresserBio">
                    <p>This is Angela, our perm specialist! With a rich background as an apprentice to renowned
                        hairdressers in the fashion industry, Angela brings a wealth of experience having worked
                        with an extensive clientele. Making a bold move to Australia a few years ago for a new chapter, 
                        Angela brings an international touch to our salon.</p>  
                </div>
                <div className="hairdresserService">
                    <p>Angela is an expert in creating beautiful, bouncy curls through the art of perms. With a commitment
                        to enhancing your natural beauty, she specialises in delivering gorgeous and long-lasting curls. 
                        Whether you're after loose waves or tight coils, Angela’s skill and precision ensure a stunning 
                        perm tailored to your preferences.</p>
                </div>
            </div>
        </div>
    )
}

export default Hairdressers