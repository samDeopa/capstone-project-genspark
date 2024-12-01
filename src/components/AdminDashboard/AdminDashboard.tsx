import AdminSidebar from "../AdminSidebar/AdminSidebar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 min-h-screen bg-gray-100">
        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Card 1: Total Users */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-lg font-semibold text-gray-800">
                Total Users
              </h3>
              <p className="text-3xl font-bold text-blue-600">1,245</p>
            </div>

            {/* Card 2: Total Orders */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-lg font-semibold text-gray-800">
                Total Orders
              </h3>
              <p className="text-3xl font-bold text-green-600">987</p>
            </div>

            {/* Card 3: Total Revenue */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <h3 className="text-lg font-semibold text-gray-800">
                Total Revenue
              </h3>
              <p className="text-3xl font-bold text-orange-600">₹45,678</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Activity
            </h3>
            <ul className="space-y-4 mt-4">
              <li className="flex justify-between">
                <span className="text-gray-700">
                  User John Doe created a new order
                </span>
                <span className="text-gray-500 text-sm">2 minutes ago</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">
                  User Jane Smith updated profile
                </span>
                <span className="text-gray-500 text-sm">10 minutes ago</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-700">
                  New user registration: Mark
                </span>
                <span className="text-gray-500 text-sm">30 minutes ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
