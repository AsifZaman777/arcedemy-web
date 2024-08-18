import PropTypes from 'prop-types';
import './courseCard.css';

const CourseCard = ({ image, title, description, Icon }) => {
    return (
        <div className="cards">
            <a href="#" className="card text-white">
                <img src={image} className="card__image" alt="Card Background" width={900} height={900} />
                <div className="card__overlay">
                    <div className="card__header">
                        <svg className="card__arc" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
                            <path d="M 40 80 c 22 0 40 -22 40 -40 v 40 Z" fill="var(--surface-color)" />
                        </svg>
                        <div className="card__header-text">
                            <Icon className="card__icon" />
                            <h3 className="card__title text-xl font-bold">{title}</h3>
                        </div>
                    </div>
                    <p className="card__description text-justify">{description}</p>
                </div>
            </a>
        </div>
    );
}

CourseCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    Icon: PropTypes.elementType.isRequired, // Add PropTypes for Icon
};

export default CourseCard;
