import 'react-alice-carousel/lib/alice-carousel.css';
import HomeCards from '../HomeCards';
import AliceCarousel from 'react-alice-carousel';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useState } from 'react';
import { homeCarouselData } from '../carousel/HomeCarouselData';

const ProductsCarousel = ({data,sectionName}) => {
    const [slide, setSlide] = useState(0)
    const responsive = {
        0: { items: 1 },
        568: { items: 3 },
        1024: { items: 5 },
    };
    //data.map
     const items = [1, 1, 1, 1].map((item, key) => {
         return <HomeCards  key={key} />;
       });

    // const items = homeCarouselData.map((item, index) => (
    //     <img role='presentation' className='cursor-pointer  h-[25rem]' key={index} src={item.image} alt=''/>
    // ));

    const previousSlide = () => setSlide(slide-1)
    const nextSlide = () => setSlide(slide+1)
    const productsSlide = ({item}) => setSlide(item)

  return (
    <div className='px-2 lg:px-8'>
        <div className=' text-2xl text-brown py-5'>{sectionName}</div>
        <div className='relative p-5'>
     <AliceCarousel

        items={items}
        responsive={responsive}
        disableButtonsControls
        disableDotsControls
        onSlideChanged={productsSlide}
        activeIndex={slide}
        />
        <button onClick={nextSlide} className='z-50 hover:bg-primary h-20 p-2 rounded-md' style={{position:'absolute' , top:"6rem" , right:"0rem" }}>
            <ChevronRightIcon className='text-2xl' />
        </button>
        <button onClick={previousSlide} className='z-50 hover:bg-primary h-20 p-2 rounded-md' style={{position:'absolute' , top:"8rem" , left:"0rem" }}>
            <KeyboardArrowLeftIcon className='text-2xl' />
        </button>
        </div>
    </div>
  )
}

export default ProductsCarousel