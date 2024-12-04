import { useContext, useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Product from "../../models/Product.model";
import { fetchAllProducts } from "../../services/Product.service";
import ProductCard from "../../components/ProductCard/ProductCard";
import { customerContext } from "../../contextAPI/customer/customerContextProvider";
import { enqueueSnackbar } from "notistack";
import Cart from "../../components/Cart/Cart";
import { addProductToCart } from "../../services/Cart.service";
import Footer from "../../components/Footer/Footer";

const ProductsPage = () => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const { isLoggedIn, cartId } = useContext(customerContext);

  const toggleCart = (value: boolean) => {
    if (isLoggedIn) {
      setCartOpen(value);
    } else {
      enqueueSnackbar("Please Login to access the cart!", {
        variant: "warning",
      });
    }
  };

  const addToCart = (productId: string) => {
    if (!isLoggedIn) {
      enqueueSnackbar("Please Login to add product to cart!", {
        variant: "warning",
      });
      return;
    }
    if (cartId) {
      addProductToCart(cartId, productId);
      enqueueSnackbar("Product added to the cart", { variant: "success" });
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchAllProducts().then((data) => {
      setProductsList(data);
      setFilteredProducts(data);
      const uniqueCategories = Array.from(
        new Set(data.map((product) => product.category))
      );
      setCategories(["All", ...uniqueCategories]);
    });
  }, []);

  // Filter products based on category and search query
  useEffect(() => {
    let updatedProducts = productsList;

    if (selectedCategory !== "All") {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchQuery) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  }, [selectedCategory, searchQuery, productsList]);

  return (
    <>
      <Header setCartOpen={toggleCart} />
      <div className="px-10 py-10">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-xl font-bold">Products</p>
          <div className="flex gap-4 items-center">
            {/* Search Bar */}
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              wide={true}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>
      <Footer />
      {cartOpen && <Cart cartOpen={cartOpen} setCartOpen={toggleCart} />}
    </>
  );
};

export default ProductsPage;
