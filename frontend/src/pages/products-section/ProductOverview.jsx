import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { Box, Grid, LinearProgress, Rating } from '@mui/material'
import ReviewCard from './ReviewCard'
import ProductCard from './ProductCard'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { findSingleProduct } from '../../redux/products/Action'
import { addItemToCart } from '../../redux/cart/Action'

const product = {
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function ProductOverview() {
  const navigate = useNavigate()
  const [selectedSize, setSelectedSize] = useState("")
  const dispatch = useDispatch()
  const productState = useSelector((state) => state.product)
  const currentProduct = productState?.product
  console.log(currentProduct)
  const params = useParams()

  const handleNavigateCart = () => {
    const data = { productId: parseInt(params.id, 10),size:selectedSize }; 
    console.log(data);
    dispatch(addItemToCart(data))
    navigate("/cart")
  }

  useEffect(()=>{
    dispatch(findSingleProduct(params.id))
  },[params.id])

  return (
    <div className="bg-white pt-24 lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10'>
              {/* Image gallery */}
        <div className="flex flex-col items-center">
          <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
            <img
              src={currentProduct?.image}
              alt={""}
              className="h-full w-full object-cover object-center"
            />
          </div>

          
         
        </div>

        {/* Product info */}
        <div className="lg:col-span-1 max-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
          <div className="lg:col-span-2">
            <h1 className="text-lg lg:text-xl font-semi-bold text-primary font-black">{currentProduct?.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">{currentProduct?.description}</h2>
            <div className="flex space-x-5 items-center text-lg lg:text-xl">
            <div className="font-semibold">{currentProduct?.discountedPrice}</div>
            <div className=" line-through opacity-50">{currentProduct?.price}</div>
            <div className=" text-secondary font-semibold pl-10">{currentProduct?.discount}% Off</div>
            </div>

            {/* Reviews */}
            <div className="mt-6">
              <div className='flex items-center space-x-3'>
              <Rating name='read-only' value={3.5} readOnly/>
              <div className='opacity-50 text-sm'>1000 ratings</div>
              <div className='ml-3 text-sm font-semibold text-blue '>1000 review</div>
              </div>
            </div>

            <form className="mt-10">
             
              {/* Sizes */}
              {
                currentProduct?.sizes.length > 0 && 
                <>
                <div className="mt-10">
               
               <div className="flex items-center justify-between">
               <h3 className="text-sm font-medium text-gray-900">Size</h3>
              
             </div>
           
             
                <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
               <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                 {currentProduct?.sizes.map((size,index) => (
                   <RadioGroup.Option
                     key={index}
                     value={size.name}
                     className={({ active }) =>
                       classNames(
                        currentProduct?.quantity > 0
                           ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                           : 'cursor-not-allowed bg-gray-50 text-gray-200',
                         active ? 'ring-2 ring-indigo-500' : '',
                         'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                       )
                     }
                   >
                     {({ active, checked }) => (
                       <>
                         <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                         {currentProduct?.quantity > 0 ? (
                           <span
                             className={classNames(
                               active ? 'border' : 'border-2',
                               checked ? 'border-indigo-500' : 'border-transparent',
                               'pointer-events-none absolute -inset-px rounded-md'
                             )}
                             aria-hidden="true"
                           />
                         ) : (
                           <span
                             aria-hidden="true"
                             className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                           >
                             <svg
                               className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                               viewBox="0 0 100 100"
                               preserveAspectRatio="none"
                               stroke="currentColor"
                             >
                               <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                             </svg>
                           </span>
                         )}
                       </>
                     )}
                   </RadioGroup.Option>
                 ))}
               </div>
                </RadioGroup>
           </div>
                </>
              }

              <button
                onClick={handleNavigateCart}
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-blue px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to Cart
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <div className="text-base text-gray-900">{currentProduct?.description}</div>
              </div>
            </div>
            
          </div>
        </div>      
        </section>

        {/* Ratings and reviews */}
        <h1 className=' font-semibold text-lg pb-4'>Reviews and ratings</h1>
        <div className='border border-y border-grey p-5'>
            <Grid container spacing={7}>
                <Grid item xs={7}>
                    <div className='space-y-5'>
                        {
                          [1,1,1].map((item,key) => <ReviewCard key={key} className="p-5"/>)
                        }
                    </div>
                </Grid>

                <Grid item xs={5}>
                   <h1 className='text-xl font-semibold pb-1'>
                        Products Ratings
                   </h1>

                   <div className='flex items-center space-x-3'>
                      <Rating value={4.6} precision={.5} readOnly></Rating>
                      <div className='opacity-60'>58437</div>
                   </div>

                   <Box className="mt-5">
                    {/* 5 */}
                     <Grid container  justifyContent={"center"} alignItems={"center"}>
                        <Grid item xs={1}>
                          <div className=' font-bold text-lg'>5</div>
                        </Grid>
                        
                        <Grid item xs={7}>
                          <LinearProgress variant='determinate' className='bg-primary' value={50} sx={{bgcolor : "white" , borderRadius:4 , height:7 }}></LinearProgress>

                        </Grid>

                     </Grid>

                     {/* 4 */}

                     <Grid container  justifyContent={"center"} alignItems={"center"}>
                        <Grid item xs={1}>
                          <div className=' font-bold text-lg'>4</div>
                        </Grid>
                        
                        <Grid item xs={7}>
                          <LinearProgress variant='determinate' color='inherit'  value={40} sx={{bgcolor : "white" , borderRadius:4 , height:7 }}></LinearProgress>

                        </Grid>

                     </Grid>

                     {/* 3 */}

                     <Grid container  justifyContent={"center"} alignItems={"center"}>
                        <Grid item xs={1}>
                          <div className=' font-bold text-lg'>3</div>
                        </Grid>
                        
                        <Grid item xs={7}>
                          <LinearProgress variant='determinate' color='inherit'  value={30} sx={{bgcolor : "white" , borderRadius:4 , height:7 }}></LinearProgress>

                        </Grid>

                     </Grid>

                     {/* 2 */}

                     <Grid container  justifyContent={"center"} alignItems={"center"}>
                        <Grid item xs={1}>
                          <div className=' font-bold text-lg'>2</div>
                        </Grid>
                        
                        <Grid item xs={7}>
                          <LinearProgress variant='determinate' color='inherit'  value={20} sx={{bgcolor : "white" , borderRadius:4 , height:7 }}></LinearProgress>

                        </Grid>

                     </Grid>

                     {/* 4 */}

                     <Grid container  justifyContent={"center"} alignItems={"center"}>
                        <Grid item xs={1}>
                          <div className=' font-bold text-lg'>1</div>
                        </Grid>
                        
                        <Grid item xs={7}>
                          <LinearProgress variant='determinate' color='inherit'  value={10} sx={{bgcolor : "white" , borderRadius:4 , height:7 }}></LinearProgress>

                        </Grid>

                     </Grid>
                   </Box>
                </Grid>

            </Grid>
        </div>


        {/* Similar products */}

        {/* <section className='pt-10'>
          <h1 className='text-xl py-5 font-bold'>Similar products</h1>
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
              {[1,1,1,1,1,1,1,1,1,1,1,1].map((item , key) => <ProductCard key={key}/>)}
            </div>            
        </section> */}
      </div>
    </div>
  )
}
