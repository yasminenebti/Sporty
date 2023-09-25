import { useNavigate } from "react-router";
import PropTypes from 'prop-types';


const ProductCard = ({product}) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/product/${product.id}`)} className="w-[14rem] m-3 cursor-pointer transition duration-200 ease-out ">
      <div className="h-[20rem]">
        <img
        src={product.image}
          alt=""
          className="h-full w-full object-fit object-left-top"
        />
      </div>

      <div className="bg-white">
        {" "}
        <div>
          <p className="font-bold opacity-60">{product.name}</p>{" "}
          <p className="max-w-md">{product.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">{product.discountedPrice}</p>
          <p className=" line-through opacity-50">{product.price}</p>
          <p className=" text-secondary font-semibold pl-10">{product.discount}%</p>
        </div>
      </div>
    </div>
  );
};

 ProductCard.propTypes = {
   product: PropTypes.object.isRequired,  
 };


export default ProductCard;
