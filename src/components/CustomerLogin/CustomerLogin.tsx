import { FormEvent, useContext, useState } from "react";
import { authenticateCustomer } from "../../services/Customer.service";
import { customerContext } from "../../contextAPI/customer/customerContextProvider";
import { useNavigate } from "react-router";
import { enqueueSnackbar } from "notistack";

const CustomerLogin = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const { setIsLoggedIn, setUserId, setCartId, cartId } =
    useContext(customerContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!validateEmail(email)) {
      enqueueSnackbar("Invalid Email", { variant: "error" });
      return;
    }
    try {
      const res = await authenticateCustomer(email, password);

      setIsLoggedIn(true);
      setUserId(res.id || "");
      setCartId(res.cartId || undefined);
      navigate("/");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred!";

      enqueueSnackbar(errorMessage, { variant: "error" });
      console.log(errorMessage);
    }
  };
  function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <div className="bg-sky-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
          alt=""
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="mb-4 bg-sky-100">
            <label className="block text-gray-600">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              autoComplete="off"
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="text-red-500"
            />
            <label className="text-green-900 ml-2">Remember Me</label>
          </div>
          <div className="mb-6 text-blue-500">
            <a href="/adminLogin" className="hover:underline">
              Login as an Admin.
            </a>
          </div>
          <button
            type="submit"
            className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-green-500 text-center">
          <a href="/signup" className="hover:underline">
            Sign up Here
          </a>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
