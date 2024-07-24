import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import image1 from '../../assets/images/image-1.jpg';
import image3 from '../../assets/images/image-3.jpg';

const CustomCarousel = () => {
  const carouselContainerStyle = {
    maxWidth: '1200px',
    margin: '3px 4px',
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
  };

  const arrowStyle = {
    position: 'absolute',
    top: '45%',
    transform: 'translateY(-50%)',
    fontSize: '3rem',
    color: '#ffff',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const leftArrowStyle = {
    ...arrowStyle,
    left: '10px',
  };

  const rightArrowStyle = {
    ...arrowStyle,
    right: '10px',
  };

  return (
    <Carousel 
      className="max-w-6xl mx-auto sm:mx-3 md:mx-auto"
      showThumbs={false}
      infiniteLoop
      useKeyboardArrows
      autoPlay
      interval={2000}
      showStatus={false}
      showArrows={true}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={leftArrowStyle}
          >
            ‹
          </button>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <button
            type="button"
            onClick={onClickHandler}
            title={label}
            style={rightArrowStyle}
          >
            ›
          </button>
        )
      }
    >
      <div style={carouselContainerStyle}>
        <img src={image1} alt="" style={imageStyle} />
      </div>
      
      <div style={carouselContainerStyle}>
        <img src={image3} alt="" style={imageStyle} />
      </div>
    </Carousel>
  );
};

export default CustomCarousel;