import Product from "../../models/Product.model";

interface Props {
  wide: boolean;
  product: Product;
}

const ProductCard: React.FC<Props> = ({ wide, product }) => {
  return wide ? (
    <div className="w-[440px] h-[192px]  flex  bg-[#FAFAFA]  rounded-md border-solid border-[1px] border-[#e9e5e5]  px-2 py-2 gap-3  ">
      <div>
        <img
          src={product.images[0]}
          alt=""
          className="h-[150px] w-[160px] rounded-t-md "
        />
        <div className="text-[10px] font-bold  bg-[#FBC509] rounded-b-lg px-[10px] py-[4px]">
          {product.features[0]}
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full justify-between p-2 ">
        <p className="text-[14px]  font-semibold px-2    ">{product.name}</p>

        <div className="flex flex-col  self-start px-2 gap-1 ">
          <div className="flex items-center gap-1 ">
            <span className="font-bold">
              ₹{product.price - product.price * (product.discount * 0.01)}
            </span>
            <span className=" line-through  text-xs font-[10px] text-[#b2b9bf] ">
              ₹{product.price}{" "}
            </span>
            <span className="text-[12px] text-[#12b985]  ">
              {product.discount}% off
            </span>
          </div>
          <hr className="border-t-2 border-dashed w-[80%] self-center " />
          <div className="flex gap-1">
            {product.features.map((feature) => (
              <span className="font-light text-[10px] bg-[#eff4f7]  p-1 rounded-xl ">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <button className="w-full bg-black text-white h-10 rounded-lg">
          Add to cart
        </button>
      </div>
    </div>
  ) : (
    <div className="w-[216px] h-[350px] flex flex-col bg-[#FAFAFA]  rounded-md border-solid border-[1px] border-[#e9e5e5] gap-3  ">
      <div>
        <img
          src={product.images[0]}
          alt=""
          className="h-[200px] w-[216px] rounded-t-md "
        />
        <div className="text-[10px] font-bold  bg-[#FBC509] rounded-b-lg px-[10px] py-[6px]">
          {product.features[0]}
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <p className="text-[14px]  font-semibold px-2    ">{product.name}</p>
        <hr className="border-t-2 border-dashed w-[80%] self-center " />
        <div className="flex flex-col self-start px-2 ">
          <span className="font-bold">
            ₹{product.price - product.price * (product.discount * 0.01)}
          </span>
          <p>
            <span className=" line-through  text-xs font-[10px] text-[#b2b9bf] ">
              ₹{product.price}{" "}
            </span>{" "}
            <span className="text-[10px] text-[#12b985]  ">
              {product.discount}% off
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
