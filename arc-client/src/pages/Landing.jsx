import Home from "../components/Home";
import About from "../components/About";
import Service from "../components/Service";
import ContentCarosel from "../components/contents/ContentCarosel";

import Contact from "../components/Contact";
import Footer from "../components/Footer";
import LeaderboardIcon from "../components/leaderboard/LeaderboardIcon";
import Features from "../components/Features";
import Stats from "../components/Stats";

const Landing = () => {
    return (
        <div>
            <LeaderboardIcon/>
            <Home />
            <About />
            <Stats />
            <Service />
            <ContentCarosel />
            {/* <FAQSection /> */}
            {/* <OurTeam /> */}
             <Features />
            <Contact />
            <Footer />
        </div>
    );
};

export default Landing;
