import { useContext, useEffect, useState } from "react";
import Cart from "../../components/Cart/Cart";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import HeroSection from "../../components/Hero/Hero";
import SaleBanner from "../../components/SaleBanner/SaleBanner";
import { customerContext } from "../../contextAPI/customer/customerContextProvider";
import { enqueueSnackbar } from "notistack";
import ProductsDisplay from "../../components/ProductsDisplay.tsx/ProductsDisplay";
import Product from "../../models/Product.model";
import { fetchAllProducts } from "../../services/Product.service";
import BestSellers from "../../components/BestSellers/BestSellers";

const Home = () => {
  const customer = useContext(customerContext);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const toggleCart = (value: boolean) => {
    if (customer.isLoggedIn) {
      setCartOpen(value);
    } else {
      enqueueSnackbar("Please Login to access the cart!", {
        variant: "warning",
      });
    }
  };
  useEffect(() => {
    fetchAllProducts().then((data) => setProducts(data));
  }, []);

  return (
    <div>
      <Header setCartOpen={toggleCart} />
      <HeroSection />
      <SaleBanner />
      <ProductsDisplay products={products.slice(0, 6)} />
      <BestSellers />
      <Footer />
      {cartOpen && <Cart cartOpen={cartOpen} setCartOpen={toggleCart} />}
    </div>
  );
};

export default Home;
