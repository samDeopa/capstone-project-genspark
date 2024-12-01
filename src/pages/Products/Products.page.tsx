import { useState } from "react";
import Header from "../../components/Header/Header";
import Product from "../../models/Product.model";
import { fetchAllProducts } from "../../services/Product.service";
import ProductCard from "../../components/ProductCard/ProductCard";

const ProductsPage = () => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  useState(() => {
    fetchAllProducts().then((data) => setProductsList(data));
  });
  return (
    <>
      <Header />
      <div className="px-10 py-10">
        <p className=" text-xl font-bold ">Products</p>
        <div className="flex flex-wrap gap-4">
          {productsList.map((product) => (
            <ProductCard product={product} wide={true} />
          ))}
        </div>
      </div>
    </>
  );
};
export default ProductsPage;
