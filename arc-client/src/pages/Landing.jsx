import Home from "../components/Home";
import About from "../components/About";
import Service from "../components/Service";
import Course from "../components/Course";

import Contact from "../components/Contact";
import Footer from "../components/Footer";
import LeaderboardIcon from "../components/leaderboard/LeaderboardIcon";
import Features from "../components/Features";

const Landing = () => {
    return (
        <div>
            <LeaderboardIcon/>
            <Home />
            <About />
            <Service />
            <Course />
            {/* <FAQSection /> */}
            {/* <OurTeam /> */}
             <Features />
            <Contact />
            <Footer />
        </div>
    );
};

export default Landing;
