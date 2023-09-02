import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  return (
    <div className="w-[14rem] m-3 cursor-pointer transition duration-200 ease-out ">
      <div className="h-[20rem]">
        <img
          src="https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
          alt=""
          className="h-full w-full object-cover object-left-top"
        />
      </div>

      <div className="bg-white">
        {" "}
        <div>
          <p className="font-bold opacity-60">equipement</p>{" "}
          <p className="">get better and healthier</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">100$</p>
          <p className=" line-through opacity-50">100$</p>
          <p className=" text-secondary font-semibold">100$</p>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.func.isRequired,
};

export default ProductCard;
