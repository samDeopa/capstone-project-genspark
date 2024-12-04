import { useContext, useEffect, useState } from "react";
import CheckoutCart from "../../components/CheckoutCart/CheckoutCart";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { customerContext } from "../../contextAPI/customer/customerContextProvider";
import {
  addAddressToCustomer,
  addOrderToCustomer,
  getCustomerAddresses,
} from "../../services/Customer.service";
import Address from "../../models/Address.model";
import AddAddressForm, {
  AddressFormData,
} from "../../components/AddAddressForm/AddAddressForm";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router";
import { clearCart, getCartTotal } from "../../services/Cart.service";
import { enqueueSnackbar } from "notistack";

const CheckoutPage = () => {
  const { userId, cartId } = useContext(customerContext);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [addingAddress, setAddingAdress] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = () => {
    getCustomerAddresses(userId).then((data) => {
      setAddresses(data);
    });
  };
  const onFormSubmit = (formData: AddressFormData) => {
    setAddingAdress(false);
    addAddressToCustomer(userId, { ...formData, id: uuid() });
    fetchAddresses();
  };
  const performCheckout = async () => {
    if (selectedAddress === "") {
      enqueueSnackbar("Plese select delivary address to proceed.", {
        variant: "warning",
      });
      return;
    }

    if (cartId) {
      const totalAmount = await getCartTotal(cartId);
      if (totalAmount === 0) {
        enqueueSnackbar("No Products in the cart.", {
          variant: "warning",
        });
        return;
      }
      addOrderToCustomer(userId, cartId, selectedAddress);
      clearCart(cartId).then(() => navigate("/order-confirm"));
    }
  };
  return (
    <>
      <Header setCartOpen={() => {}} />
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-3 bg-white h-screen min-h-screen p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Shipping</h1>
          <p className="text-gray-600 mb-4">
            Manage all the shipping addresses you want. This way you won't have
            to enter the shipping address manually with every order. Select the
            address you want to get your order delivered.
          </p>
          <hr className="mb-4" />
          <div>
            {/* TODO: Display list of addresses and corresponding "Delete" buttons, if present, of which 1 can be selected */}
            {addresses.length ? (
              <div>
                {addresses.map((address) => (
                  <div
                    className={`p-4 flex justify-between items-center cursor-pointer mb-2 ${
                      selectedAddress === address.id
                        ? "border-2 border-blue-500 rounded-lg"
                        : "border border-gray-300 rounded-lg"
                    }`}
                    onClick={() => {
                      setSelectedAddress(address.id);
                    }}
                  >
                    <p className="text-gray-800">{`${address.address_line}, ${address.city}, ${address.country}, ${address.postalCode}`}</p>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        // deleteAddress(token, add._id);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 mr-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="my-4 text-gray-600">
                No addresses found for this account. Please add one to proceed.
              </p>
            )}
          </div>
          <div className="mt-4">
            {/* TODO: Dislay either "Add new address" button or the <AddNewAddressView> component */}
            {addingAddress ? (
              <div>
                <AddAddressForm onSubmit={onFormSubmit} />
              </div>
            ) : (
              //   <AddNewAddressView
              //     token={token}
              //     newAddress={newAddress}
              //     handleNewAddress={setNewAddress}
              //     addAddress={addAddress}
              //   />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => setAddingAdress(true)}
              >
                Add new address
              </button>
            )}
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
            Payment
          </h1>
          <p className="text-gray-600 mb-4">Payment Method</p>
          <input type="radio" id="paymentType" checked />
          <label htmlFor="paymetType" className="px-2">
            COD
          </label>
          <hr className="mb-4" />

          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center gap-2"
            onClick={() => {
              performCheckout();
            }}
          >
            PLACE ORDER
          </button>
        </div>
        <div className="col-span-1 bg-gray-100 p-6">
          {/* <Cart isReadOnly products={products} items={items} />
          <OrderDetail
            totalCost={getTotalCartValue(items)}
            numberOfProducts={getTotalItems(items)}
          /> */}
          <CheckoutCart />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default CheckoutPage;
