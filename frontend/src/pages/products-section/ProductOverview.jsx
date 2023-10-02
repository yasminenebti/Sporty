import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Grid, Rating } from "@mui/material";
import ReviewCard from "./ReviewCard";
import ProductCard from "./ProductCard";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { findSingleProduct, recentProducts } from "../../redux/products/Action";
import { addItemToCart } from "../../redux/cart/Action";
import { createReview, getReviewByProduct } from "../../redux/review/Action";

import { AiOutlineSend } from "react-icons/ai";
import { getRatingByProduct } from "../../redux/rating/Action";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductOverview() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const productState = useSelector((state) => state.product);
  const reviewState = useSelector((state) => state.review);
  const ratingState = useSelector((state) => state.rating);


  const currentProduct = productState?.product;
  const recentItems = productState?.recents;

  const [selectedSize, setSelectedSize] = useState("");


  const [currentReviews , setCurrentReviews] = useState([])
  const [currentRatings , setCurrentRatings] = useState([])

  const [addReview , setAddReview] = useState("")
  const [addRating , setAddRating] = useState("")
  const [overallRating , setOverallRating] = useState(0)





  const handleNavigateCart = () => {
    const data = { productId: parseInt(params.id, 10), size: selectedSize };
    console.log(data);
    dispatch(addItemToCart(data));
    navigate("/cart");
  };

  useEffect(() => {
    dispatch(findSingleProduct(params.id));
  }, [params.id]);

  useEffect(() => {
    dispatch(getReviewByProduct(params.id));
  }, [params.id]);
  useEffect(() => {
    dispatch(getRatingByProduct(params.id));
  }, [params.id]);

  useEffect(() => {
    dispatch(recentProducts());
  }, [dispatch]);

  useEffect(()=>{
    setCurrentReviews(reviewState?.reviews)
  },[reviewState?.reviews])

  useEffect(()=>{
    setCurrentRatings(ratingState?.ratings)
  },[ratingState?.ratings])

  const handleCreateNewReview = () => {
    dispatch(createReview(addReview,params.id))
    //console.log(addReview)
    
  }

  useEffect(() => {
    const totalRating = currentRatings.length;
  
    if (totalRating > 0) {
      const sumRating = currentRatings.reduce((accumulator, item) => accumulator + item.rating, 0);

      const averageRating = sumRating / totalRating;
  
      setOverallRating(averageRating);
    }
  }, [currentRatings]);

  console.log(overallRating)
  
  

  return (
    <div className="bg-white pt-24 lg:px-20">
      <div className="pt-6">
        

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
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
              <h1 className="text-lg lg:text-xl font-semi-bold text-primary font-black">
                {currentProduct?.name}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">{currentProduct?.description}</h2>
              <div className="flex space-x-5 items-center text-lg lg:text-xl">
                <div className="font-semibold">
                  ${currentProduct?.discountedPrice}
                </div>
                <div className=" line-through opacity-50">
                  ${currentProduct?.price}
                </div>
                <div className=" text-secondary font-semibold pl-10">
                  {currentProduct?.discount}% Off
                </div>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating name="read-only" value={overallRating} readOnly />
                  <div className="opacity-50 text-sm">{currentRatings.length} ratings</div>
                  <div className="ml-3 text-sm font-semibold text-blue ">
                    {currentProduct?.review.length} reviews
                  </div>
                </div>
              </div>

              <form className="mt-10">
                {/* Sizes */}
                {currentProduct?.sizes.length > 0 && (
                  <>
                    <div className="mt-10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          Size
                        </h3>
                      </div>

                      <RadioGroup
                        value={selectedSize}
                        onChange={setSelectedSize}
                        className="mt-4"
                      >
                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                          {currentProduct?.sizes.map((size, index) => (
                            <RadioGroup.Option
                              key={index}
                              value={size.name}
                              className={({ active }) =>
                                classNames(
                                  currentProduct?.quantity > 0
                                    ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                                    : "cursor-not-allowed bg-gray-50 text-gray-200",
                                  active ? "ring-2 ring-indigo-500" : "",
                                  "group relative flex items-center justify-center rounded-md  py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                )
                              }
                            >
                              {({ active, checked }) => (
                                <>
                                  <RadioGroup.Label as="span">
                                    {size.name}
                                  </RadioGroup.Label>
                                  {currentProduct?.quantity > 0 ? (
                                    <span
                                      className={classNames(
                                        active ? "border" : "border-2",
                                        checked
                                          ? "border-indigo-500"
                                          : "border-transparent",
                                        "pointer-events-none absolute -inset-px rounded-md"
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
                                        <line
                                          x1={0}
                                          y1={100}
                                          x2={100}
                                          y2={0}
                                          vectorEffect="non-scaling-stroke"
                                        />
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
                )}

                <button
                  onClick={handleNavigateCart}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-blue px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1  lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <div className="text-base text-gray-900">
                    {currentProduct?.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ratings and reviews */}
        <h1 className=" font-semibold text-lg pb-4 pt-16">
          Reviews
        </h1>
        <div className="border border-y border-grey p-5">
          <div>
            <Grid item xs={7}>
              
                
                <div className="space-y-5 ">
                {currentReviews.map((item, key) => (
                  <ReviewCard item={item} key={key} className="p-5" />
                ))}
              </div>  
              
              
              <div className="pt-4 ">
                <form>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
                    <input
                      onChange={(e) => setAddReview(e.target.value)} 
                      value={addReview}
                      className="block w-full p-4 pl-10 text-sm  border border-tertiary rounded-lg  focus:ring-blue focus:border-blue    dark:text-primary dark:focus:ring-blue dark:focus:border-brown"
                      placeholder="Add your review"
                      required
                    />
                    <button
                      type="submit"
                      onClick={(e) => {
                           e.preventDefault(); 
                           handleCreateNewReview();
                           setAddReview(""); 
                          
                      }}
                      className="text-white absolute right-2.5 bottom-2 bg-blue hover:text-primary hover:bg-white transition duration-700 font-medium rounded-lg text-sm px-4 py-2"
                    >
                      <AiOutlineSend className=" text-2xl" />
                    </button>
                  </div>
                </form>
              </div>
            </Grid>
          </div>
        </div>

        {/* other products */}

        <section className="pt-10">
          <h1 className="text-xl py-5 font-bold">Similar products</h1>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {recentItems.slice(0, 4).map((item, key) => (
              <ProductCard product={item} key={key} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
