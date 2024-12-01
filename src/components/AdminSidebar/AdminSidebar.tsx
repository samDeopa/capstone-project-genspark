import { NavLink } from "react-router";

const AdminSidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex flex-col mt-4">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `px-4 py-2 text-sm font-medium ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/customers"
          className={({ isActive }) =>
            `px-4 py-2 text-sm font-medium ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Manage Customers
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `px-4 py-2 text-sm font-medium ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Manage Orders
        </NavLink>
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `px-4 py-2 text-sm font-medium ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/admin/reports"
          className={({ isActive }) =>
            `px-4 py-2 text-sm font-medium ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Reports
        </NavLink>
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            `px-4 py-2 text-sm font-medium ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Settings
        </NavLink>
      </nav>
      <div className="mt-auto p-4">
        <button className="w-full bg-red-600 hover:bg-red-500 text-white font-medium py-2 px-4 rounded">
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
