import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const HomeCards = ({item}) => {
  const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/product/${item.id}`)} className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden mx-3 p-4">
        <div className="h-[13rem] w-[10rem]">
          <img 
          className=" w-full h-full" 
          src={item?.image}/>
        </div>

        <div className="p-4 max-h-5">
            <h3 className=" text-brown text-lg font-medium">{item?.name}</h3>
        </div>
    </div>
  )
}

HomeCards.propTypes = {
  item: PropTypes.object.isRequired,  
};


export default HomeCards