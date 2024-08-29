import Home from "../components/Home";
import About from "../components/About";
import Service from "../components/Service";
import OurTeam from "../components/OurTeam";
import Course from "../components/Course";
import FAQSection from "../components/FAQ"; // Corrected import path
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import LeaderboardIcon from "../components/leaderboard/LeaderboardIcon";


const Landing = () => {
    return (
        <div>
            <LeaderboardIcon />
            <Home />
            <About />
            <Service />
            <Course />
            <FAQSection />
            <OurTeam />
            <Contact />
            <Footer />
        </div>
    );
};

export default Landing;
