import { useState, useEffect } from 'react';
import goody1 from '../assets/images/image1.jpg';
import goody2 from '../assets/images/image2.jpg';
import Typewriter from 'typewriter-effect';
import arcLogo from "../assets/images/arc-logo.png";

const Home = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [navbarScrolled, setNavbarScrolled] = useState(false);
    const images = [goody1, goody2];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            if (scrollTop > 50) {
                setNavbarScrolled(true);
            } else {
                setNavbarScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            {/* Navbar */}
            <div className={`navbar py-1 shadow-2xl fixed w-full top-0 left-0 z-20 transition-colors duration-300 ${
                navbarScrolled ? 'bg-white text-black' : 'bg-transparent text-white'
            }`}>
                <div className="navbar-start flex items-center">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16"
                                />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className={`menu menu-lg font-bold dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-lg ${
                                navbarScrolled ? 'text-black' : 'text-white'
                            }`}
                        >
                            <li><a href='#home' className="text-lg">Home</a></li>
                            <li><a href='#about' className="text-lg">About</a></li>
                            <li><a href='#service' className="text-lg">Service</a></li>
                            <li><a href='#courses' className="text-lg">Courses</a></li>
                            <li><a href='#faq' className="text-lg">FAQ</a></li>
                            <li><a href='#contact' className="text-lg">Contact</a></li>
                        </ul>
                    </div>
                    <img className='ml-20' src={arcLogo} width={70} alt="Arcedemy" />
                    <div className="btn btn-ghost text-3xl animate-pulse animate-ease-linear ml-2">
                        <a className="text-orange-300 px-0 py-0 rounded-lg">Arcedemy</a>
                    </div>
                </div>

                <div className="navbar-center hidden lg:flex flex-grow justify-center">
                    <ul className="menu menu-horizontal px-1 text-lg">
                        <li><a href='#home' className="hover:bg-orange-600 transition-colors duration-300">Home</a></li>
                        <li><a href='#about' className="hover:bg-orange-600 transition-colors duration-300">About</a></li>
                        <li><a href='#service' className="hover:bg-orange-600 transition-colors duration-300">Service</a></li>
                        <li><a href='#courses' className="hover:bg-orange-600 transition-colors duration-300">Courses</a></li>
                        <li><a href='#faq' className="hover:bg-orange-600 transition-colors duration-300">FAQ</a></li>
                        <li><a href='#contact' className="hover:bg-orange-600 transition-colors duration-300">Contact</a></li>
                    </ul>
                </div>

                <div className="navbar-end hidden lg:flex">
                    <button className="btn border-none mr-10 hover:bg-orange-600">Admin Panel</button>
                </div>
            </div>

            {/* Hero Section */}
            <div id="home" className="relative min-h-screen flex flex-col overflow-hidden mt-0">
                {/* Image Carousel */}
                <div className="absolute top-0 left-0 w-full h-full">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Carousel ${index}`}
                            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                                currentImage === index ? 'opacity-100' : 'opacity-0'
                            }`}
                            style={{ height: '100vh' }} // Adjust height here
                        />
                    ))}
                </div>

                {/* Dark overlay */}
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

                <div className="relative z-10 text-left px-4 md:px-8 ml-10 md:ml-48">
                    <h1 className="text-5xl md:text-8xl text-orange-400 font-bold mt-52">Arcedemy</h1>
                    <p className="text-2xl md:text-4xl mt-4 text-white">Arcedemy is a community to</p>
                    <p className="text-2xl md:text-5xl font-bold mt-4 text-white">
                        <Typewriter 
                            options={{
                                strings: ['Learn...', 'Grow...', 'Play...'],
                                autoStart: true,
                                loop: true,
                                delay: 100,
                            }}
                        />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
