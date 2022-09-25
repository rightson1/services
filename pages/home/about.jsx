import React from "react";
import Nav from "../../components/Nav";

const About = () => {
    return <div className="">
        <Nav />
        <div className="flex p-8 flex-wrap items-center  gap-12 md:gap-4">
            <div className="flex flex-col w-full h-full shadow-lg p-8 gap-8">
                <h1 className="shadow p-4 text-center">About Us</h1>
                <p>  We Provide home services to people living in Nairobi at affordable prices. We act as middlemen
                    between Professional service providers eg baby sitters,plumbers and carpenters</p>
            </div>
            <div className="flex flex-col w-full h-full shadow-lg p-8 gap-8">
                <h1 className="shadow p-4 text-center">About Developer</h1>
                <p>  Developed By Rightson Kirigha a 2nd year Riara university Student who i passionate about developing new ideas</p>
            </div>

        </div>

    </div>;
};

export default About;
