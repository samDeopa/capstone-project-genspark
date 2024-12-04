import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import {
  fetchAllCustomers,
  removeCustomer,
} from "../../services/Customer.service";
import Customer from "../../models/Customer.model";

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  const [filter, setFilter] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, reset } = useForm<Customer>();

  useEffect(() => {
    fetchCustomersArray();
  }, []);
  const fetchCustomersArray = () => {
    fetchAllCustomers().then((data) => setCustomers(data));
  };
  const handleAddOrEditCustomer = (data: Customer) => {
    if (currentCustomer) {
      // Update existing customer
      const updatedCustomers = customers.map((cust) =>
        cust.id === currentCustomer.id ? { ...data, id: cust.id } : cust
      );
      setCustomers(updatedCustomers);
    } else {
      // Add new customer
      const newCustomer = {
        ...data,
        id: `cust-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCustomers([...customers, newCustomer]);
    }
    reset();
    setShowModal(false);
    setCurrentCustomer(null);
  };

  const handleEdit = (customer: Customer) => {
    console.log(customer);
    setCurrentCustomer(customer);
    setShowModal(true);
    reset(customer);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Do you want to Delete Customer?")) {
      return;
    }
    removeCustomer(id);
    fetchCustomersArray();
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="flex">
      <AdminSidebar />
      <div className=" flex-1 bg-gray-800 text-white container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Customer Management</h1>

        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              setShowModal(true);
              setCurrentCustomer(null);
              reset();
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Customer
          </button>
          <input
            type="text"
            placeholder="Search customers..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border text-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Customer List */}
        <div className="overflow-x-auto bg-gray-900 shadow-md rounded-lg">
          {filteredCustomers.length > 0 ? (
            <table className="min-w-full table-auto text-gray-200">
              <thead>
                <tr className="  bg-gray-700 ">
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Email</th>
                  <th className="py-2 px-4 text-left">Contact</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="  hover:bg-gray-700">
                    <td className="py-2 px-4">{customer.id}</td>
                    <td className="py-2 px-4">{customer.name}</td>
                    <td className="py-2 px-4">{customer.email}</td>
                    <td className="py-2 px-4">{customer.phoneNumber}</td>
                    <td className="py-2 px-4 flex space-x-2">
                      {/* <button
                        onClick={() => handleEdit(customer)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Edit
                      </button> */}
                      <button
                        onClick={() => handleDelete(customer.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600 p-4">No customers found.</p>
          )}
        </div>

        {/* Add/Edit Customer Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white text-black rounded-lg shadow-lg p-6 w-96">
              <h2 className="text-lg font-bold mb-4">
                {currentCustomer ? "Edit Customer" : "Add Customer"}
              </h2>
              <form onSubmit={handleSubmit(handleAddOrEditCustomer)}>
                <div className="mb-4">
                  <label className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    {...register("phoneNumber", { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Password</label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    {currentCustomer ? "Update Customer" : "Add Customer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerManagement;
