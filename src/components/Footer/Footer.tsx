import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="flex justify-between p-10 bg-[#E7F0F4] mx-4 ">
      <div>
        <img src="Logo.png" alt="" />
        <p>Subscribe to our email alerts!</p>
        <input type="email" />
      </div>
      <div>
        <p className="text-pretty text-xl mb-3 "> Shop</p>
        <div className="flex flex-col gap-1">
          <p className="text-sm">TWS</p>
          <p className="text-sm">Wired Headphones</p>
          <p className="text-sm">Wired Earphones</p>
          <p className="text-sm">Wired Speaker</p>
          <p className="text-sm">Mobile Accessories</p>
          <p className="text-sm">Home Audio</p>
          <p className="text-sm">Smart Watch</p>
          <p className="text-sm">TRebel</p>
        </div>
      </div>
      <div>
        <p className=" text-xl mb-3">Help</p>
        <div>
          <p className="text-sm">Track Your Order</p>
          <p className="text-sm">Warrenty And Support</p>
          <p className="text-sm">Return Policy</p>
          <p className="text-sm">Service Center</p>
          <p className="text-sm">Bulk Orders</p>
          <Link to="/admin/login">
            {" "}
            <p className="text-[14px]">Admin Login</p>
          </Link>
        </div>
      </div>
      <div>
        <p className="text-pretty text-xl mb-3">Company</p>
        <div>
          <p className="text-sm">About Boat</p>
          <p className="text-sm">News</p>
          <p className="text-sm">Read Our Blog</p>
          <p className="text-sm">Careers</p>
          <p className="text-sm">Security</p>
          <p className="text-sm">Investor Relation</p>
        </div>
      </div>
    </div>
  );
};
export default Footer;
