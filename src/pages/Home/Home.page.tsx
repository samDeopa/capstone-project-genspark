import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import HeroSection from "../../components/Hero/Hero";
import ProductCard from "../../components/ProductCard/ProductCard";
import SaleBanner from "../../components/SaleBanner/SaleBanner";
const product = {
  id: "prod009",
  name: "Immortal katana Blade ",
  description:
    "WirePortable Bluetooth Speaker with 12W RMS Stereo Sound, 12 Hours Playback, Bluetooth v5.0.",
  price: 1300.99,
  discount: 10,
  category: "Speakers",
  subCategory: ["Party, TWS", "Wireless"],
  stock: 22,
  images: [
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Stone_750.jpg?v=1699500834",
    "https://cdn.pixabay.com/photo/2016/12/06/09/31/headphones-1880727_960_720.jpg",
    "https://cdn.pixabay.com/photo/2017/01/10/02/07/black-and-white-1969750_960_720.jpg",
  ],
  ratings: {
    average: 4.5,
    count: 1200,
  },
  features: ["70 Hours Battery", "Bluetooth 5.0", "12 Hours Battery"],
  createdAt: "2023-10-01T12:00:00Z",
  updatedAt: "2023-11-01T14:00:00Z",
};
const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <SaleBanner />
      <Footer />
      <ProductCard product={product} wide={true} />
    </div>
  );
};

export default Home;
