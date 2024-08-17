import Home from "../components/Home";
import About from "../components/About";
import Service from "../components/Service";
import OurTeam from "../components/OurTeam";
import Course from "../components/Course";
import FAQSection from "../components/FAQ";


const Landing = () => {
    return (
        <div>
            <Home />
            <About />
            <Service/>
            <Course/>
            <FAQSection/>
            <OurTeam/>
        </div>
    );
};

export default Landing;