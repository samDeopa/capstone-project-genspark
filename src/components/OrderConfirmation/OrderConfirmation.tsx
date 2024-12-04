import { useNavigate } from "react-router";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header setCartOpen={() => {}} />
      <div className="greeting-container min-h-[60vh] flex flex-col justify-start items-center p-4 bg-[#DCFFE4]">
        <h2 className="text-2xl font-extrabold text-center mb-4">
          Yay! It's ordered 😃
        </h2>
        <p className="text-center mb-4">
          You will receive an invoice for your order shortly.
        </p>
        <p className="text-center mb-4">
          Your order will arrive in 7 business days.
        </p>
        <p className="font-semibold text-center my-4">Wallet Balance</p>
        <p className="font-semibold text-lg text-center mb-4">
          ${localStorage.getItem("balance")} Available
        </p>
        <button
          className="w-full sm:w-auto bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmation;
