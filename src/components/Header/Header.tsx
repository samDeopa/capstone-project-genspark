import { GiShoppingBag } from "react-icons/gi";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  return (
    <div>
      <div className="bg-transparent bg-[#EFF4F7] text-black text-base px-10 py-2 m-0 border-none font-sans font-normal text-left flex items-center justify-center">
        <p className=" text-xs ">
          Get 5% off on First Order | Code:{" "}
          <b>
            WELCOME5 |{" "}
            <b>
              <u>Shop&nbsp;Now!</u>
            </b>
          </b>
        </p>
      </div>
      <div className=" flex justify-between h-[85px] items-center  px-10">
        <div className=" flex">
          <img className="h-[34px] w-[85px]" src="logo.png" alt="" />{" "}
          <div className="flex gap-10 ml-20 text-[16px] font-light text-slate-700 justify-center items-center">
            <p className="h-min">Products</p>
            <p className="h-min">EarPhones</p>
            <p className="h-min">Speakers</p>
          </div>
        </div>
        <div className="flex justify-center items-center gap-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="relative w-5 h-5 left-12 text-slate-600"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            className="w-[250px] bg-[#EFF4F7] placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-full pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            placeholder="Products, Items..."
          />

          <FaRegUser size={25} />
          <GiShoppingBag size={25} />
        </div>
      </div>
    </div>
  );
};
export default Header;
