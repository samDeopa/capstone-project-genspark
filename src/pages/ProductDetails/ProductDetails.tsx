import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { customerContext } from "../../contextAPI/customer/customerContextProvider";
import { enqueueSnackbar } from "notistack";
import Product from "../../models/Product.model";
import { useLocation } from "react-router";
import { fetchProductById } from "../../services/Product.service";
import { addProductToCart } from "../../services/Cart.service";
import Cart from "../../components/Cart/Cart";

const ProductDetails: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState(0);

  const [product, setProduct] = useState<Product>();
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const { userId, isLoggedIn, cartId } = useContext(customerContext);
  const location = useLocation();
  const handleAddToCart = () => {
    if (!isLoggedIn) {
      enqueueSnackbar("Please login first.", { variant: "warning" });
      return;
    }
    if (cartId && product)
      addProductToCart(cartId, product.id).then(() =>
        enqueueSnackbar("Product added to Cart!", { variant: "success" })
      );
  };
  const toggleCart = (value: boolean) => {
    if (isLoggedIn) {
      setCartOpen(value);
    } else {
      enqueueSnackbar("Please Login to access the cart!", {
        variant: "warning",
      });
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const productId = params.get("id"); // Extract 'id' from query parameters
    if (productId) fetchProductById(productId).then((data) => setProduct(data));
  }, []);
  return product ? (
    <div>
      <Header setCartOpen={toggleCart} />
      <div className=" mx-auto px-4 py-8">
        {/* Product Gallery and Details */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Gallery */}
          <div className="flex-1">
            <div className="border rounded-lg  h-[540px]">
              <img
                src={product.images[selectedImage]}
                alt={` ${selectedImage + 1}`}
                className="w-full h-[540px] object-contain"
              />
            </div>
            <div className="flex mt-4 space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border rounded-lg overflow-hidden ${
                    selectedImage === index
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-16 h-16 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-lg font-semibold text-gray-700 mb-4">
              ₹{product.price.toLocaleString()}
            </p>
            <p className="text-gray-600 mb-4">{product.description}</p>

            {/* Features */}
            <ul className="list-disc list-inside space-y-2 mb-4">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
      {cartOpen && <Cart cartOpen={cartOpen} setCartOpen={toggleCart} />}
    </div>
  ) : (
    <div></div>
  );
};

export default ProductDetails;
