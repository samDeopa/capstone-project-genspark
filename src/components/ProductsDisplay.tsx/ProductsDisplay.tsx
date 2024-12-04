import Product from "../../models/Product.model";
import ProductCard from "../ProductCard/ProductCard";

const ProductsDisplay: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className=" p-10">
      <p className="text-2xl mb-2 ">
        Top{" "}
        <b>
          Pr<u className="decoration-red-500 ">oducts</u>
        </b>
      </p>
      <div className="flex justify-between">
        {products.map((product) => (
          <ProductCard wide={false} addToCart={() => {}} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsDisplay;
