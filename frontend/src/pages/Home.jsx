import HomeCarousel from "../components/carousel/HomeCarousel"
import ProductsCarousel from "../components/products-carousel/ProductsCarousel"

const Home = () => {
  return (
    <div>
      <HomeCarousel/>
        <div >
          <ProductsCarousel className="products-carousel" data={"data"} sectionName={"nutrition"} />
          
        </div>

    </div>
  )
}

export default Home