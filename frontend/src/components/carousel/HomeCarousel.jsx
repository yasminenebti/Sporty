import AliceCarousel from 'react-alice-carousel';
import {  homeCarouselData } from './HomeCarouselData';
import 'react-alice-carousel/lib/alice-carousel.css';

const HomeCarousel = () => {
    const items = homeCarouselData.map((item, index) => (
        <img role='presentation' className='cursor-pointer w-[80%] h-[30rem] z-10 mx-auto block' key={index} src={item.image} alt=''/>
    ));

    return (
        <AliceCarousel
        mouseTracking
        items={items}
        controlsStrategy='alternate'
        disableSlideInfo
        disableButtonsControls
        disableDotsControls
        autoPlay
        autoPlayInterval={5000}
        infinite
        />
    );
}

export default HomeCarousel;
