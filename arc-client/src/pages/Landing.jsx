import Home from "../components/Home";
import About from "../components/About";
import Service from "../components/Service";
import OurTeam from "../components/OurTeam";
import Course from "../components/Course";
import FAQSection from "../components/FAQ";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Landing = () => {
    return (
        <div>
            <Home />
            <About />
            <Service/>
            <Course/>
            <FAQSection/>
            <OurTeam/>
            <Contact/>
            <Footer/>
        </div>
    );
};

export default Landing;