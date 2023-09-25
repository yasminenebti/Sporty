import 'react-alice-carousel/lib/alice-carousel.css';
import HomeCards from '../HomeCards';
import AliceCarousel from 'react-alice-carousel';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useState } from 'react';
import { homeCarouselData } from '../carousel/HomeCarouselData';
import { useDispatch, useSelector } from 'react-redux';
import { recentProducts } from '../../redux/products/Action';

const ProductsCarousel = ({data,sectionName}) => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  const recentItems = productState?.recents

    const [slide, setSlide] = useState(0)
    const responsive = {
        0: { items: 1 },
        568: { items: 3 },
        1024: { items: 5 },
    };

     //const items = recentItems.map((item, key) => {return <HomeCards item={item}  key={key} />;});
     const items = recentItems.map((item, key) => <HomeCards item={item}  key={key} />);


    const previousSlide = () => setSlide(slide-1)
    const nextSlide = () => setSlide(slide+1)
    const productsSlide = ({item}) => setSlide(item)

  useEffect(() => {
    dispatch(recentProducts())
  },[dispatch])


  return (
    <div className='px-2 lg:px-8'>
        <div className=' text-lg font-semibold text-brown pt-5'>Recent Products</div>
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