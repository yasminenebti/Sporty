import HomeCarousel from "../components/carousel/HomeCarousel"
import ProductsCarousel from "../components/products-carousel/ProductsCarousel"
import ProductCard from "../components/products-section/ProductCard"

const Home = () => {
  return (
    <div>
      <HomeCarousel/>
        <div >
          <ProductsCarousel className="products-carousel" data={"data"} sectionName={"nutrition"} />
        </div>
        <div><ProductCard/></div>
        <div>others</div>
        <div>others</div>
        <div>others</div>
    </div>
  )
}

export default Home