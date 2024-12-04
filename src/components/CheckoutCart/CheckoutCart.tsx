import { useContext, useEffect, useState } from "react";
import { customerContext } from "../../contextAPI/customer/customerContextProvider";
import {
  createCart,
  decrementProductQuantity,
  getCartById,
  getCartTotal,
  incrementProductQuantity,
  removeProductFromCart,
} from "../../services/Cart.service";
import {
  modifyCustomer,
  updateCustomerCart,
} from "../../services/Customer.service";
import { fetchProductById } from "../../services/Product.service";
import { Link } from "react-router";

interface CartProduct {
  id: string;
  name: string;
  imageURL: string;
  price: number;
  quantity: number;
}

const CheckoutCart = () => {
  const [cartId, setCartId] = useState("");
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const customer = useContext(customerContext);

  const removeProuct = (productId: string, cartId: string) => {
    removeProductFromCart(cartId, productId).then(() => fetchCartItems());
  };
  useEffect(() => {
    if (customer.cartId) {
      setCartId(customer.cartId);
    } else {
      createCart({ customerId: customer.userId, items: [] }).then((res) => {
        customer.setCartId(res.id);
        modifyCustomer(customer.userId, { cartId: res.id });
        updateCustomerCart(customer.userId, res.id);
        setCartId(res.id);
      });
    }
  }, []);

  useEffect(() => {
    if (cartId) {
      fetchCartItems();
    }
  }, [cartId]);
  const fetchCartItems = async () => {
    const customerCart = await getCartById(cartId);
    const fetchedProducts = await Promise.all(
      customerCart.items.map(async (item) => {
        const product = await fetchProductById(item.productId);
        return {
          id: product.id,
          name: product.name,
          imageURL: product.images[0],
          price: product.price,
          quantity: item.quantity,
        };
      })
    );
    getCartTotal(cartId).then((total) => setCartTotal(total));
    setCartProducts(fetchedProducts);
  };

  return (
    <>
      <div className="relative  max-w-md ">
        {/* Products List */}
        <div className="flex-1 overflow-y-auto px-4 py-6 bg-white shadow-xl transform transition duration-500 ease-in-out translate-x-0">
          <ul className="-my-6 divide-y divide-gray-200">
            {cartProducts.map((product) => (
              <li key={product.id} className="flex py-6">
                <div className="h-24 w-24 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a>{product.name}</a>
                    </h3>
                    <p className="ml-4">₹{product.price}</p>
                  </div>
                  {/* <p className="mt-1 text-sm text-gray-500">
                          {product.q}
                        </p> */}
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                      <div className="flex items-center">
                        <button
                          type="button"
                          onClick={() => {
                            decrementProductQuantity(cartId, product.id).then(
                              () => fetchCartItems()
                            );
                          }}
                          id="decrement-button"
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                        >
                          <svg
                            className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <input
                          type="text"
                          data-input-counter
                          className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                          placeholder=""
                          value={product.quantity}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => {
                            incrementProductQuantity(cartId, product.id).then(
                              () => fetchCartItems()
                            );
                          }}
                          id="increment-button"
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                        >
                          <svg
                            className="h-2.5 w-2.5 text-gray-900 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        removeProuct(product.id, cartId);
                      }}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className=" mt-10 p-4 bg-white shadow-xl transform transition duration-500 ease-in-out translate-x-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-extrabold text-gray-800">
              Order Details
            </h2>
          </div>

          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-600">Products</p>
            <p className="text-gray-600">{cartProducts.length}</p>
          </div>

          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-600">Subtotal</p>
            <p className="text-gray-600">₹{cartTotal}</p>
          </div>

          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-600">Shipping Charges</p>
            <p className="text-gray-600">₹49</p>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p
              className="text-gray-800 font-bold text-xl"
              data-testid="cart-total"
            >
              Total
            </p>
            <p
              className="text-gray-800 font-bold text-xl"
              data-testid="cart-total"
            >
              ₹{49 + cartTotal}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutCart;
