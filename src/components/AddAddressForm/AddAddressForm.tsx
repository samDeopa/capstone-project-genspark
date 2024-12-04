import React, { FormEvent, useState, ChangeEvent } from "react";

export interface AddressFormData {
  address_line: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface AddAddressFormProps {
  onSubmit: (formData: AddressFormData) => void;
}

const AddAddressForm: React.FC<AddAddressFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<AddressFormData>({
    address_line: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      address_line: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 border border-gray-300"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Add New Address
      </h2>

      <div className="mb-4">
        <label
          htmlFor="address_line"
          className="block text-gray-700 font-medium mb-2"
        >
          Address Line
        </label>
        <input
          type="text"
          id="address_line"
          name="address_line"
          value={formData.address_line}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your address"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="city"
            className="block text-gray-700 font-medium mb-2"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your city"
            required
          />
        </div>

        <div>
          <label
            htmlFor="state"
            className="block text-gray-700 font-medium mb-2"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your state"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="postalCode"
            className="block text-gray-700 font-medium mb-2"
          >
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter postal code"
            required
          />
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-gray-700 font-medium mb-2"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your country"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700"
      >
        Add Address
      </button>
    </form>
  );
};

export default AddAddressForm;
