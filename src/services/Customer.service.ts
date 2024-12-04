import Customer from "../models/Customer.model";
import axios from "axios";
import { config } from "../utils/config";
import { hashPassword, verifyPassword } from "../utils/encrypt";
import Address from "../models/Address.model";
import { OrderModel } from "../models/Order.model";
import { v4 as uuid } from "uuid";
import { Cart, CartItem } from "../models/Cart.model";
import { getCartTotal } from "./Cart.service";

const BASE_URL = `${config.BASE_URL}/customers`;

export const fetchAllCustomers = async (): Promise<Customer[]> => {
  try {
    const { data } = await axios.get(BASE_URL);
    return data;
  } catch (error) {
    throw new Error(`Unable to retrieve customers: ${error}`);
  }
};

export const fetchCustomerById = async (
  customerId: string
): Promise<Customer> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${customerId}`);
    return data;
  } catch (error) {
    throw new Error(`Unable to find customer with ID ${customerId}: ${error}`);
  }
};

export const searchCustomers = async (
  key: string,
  value: string
): Promise<Customer[]> => {
  try {
    const { data } = await axios.get(`${BASE_URL}?${key}=${value}`);
    return data;
  } catch (error) {
    throw new Error(
      `Failed to fetch customers for ${key} = ${value}: ${error}`
    );
  }
};

export const authenticateCustomer = async (
  email: string,
  plainPassword: string
): Promise<Customer> => {
  try {
    const { data } = await axios.get(`${BASE_URL}?email=${email}`);
    const customer = data[0];

    if (
      !customer ||
      !(await verifyPassword(plainPassword, customer.password))
    ) {
      throw new Error("Invalid credentials. Please try again.");
    }

    return customer;
  } catch (error) {
    throw new Error(`Authentication failed: ${error}`);
  }
};

export const registerCustomer = async (
  newCustomer: Customer
): Promise<Customer> => {
  try {
    const [emailExists, phoneExists] = await Promise.all([
      searchCustomers("email", newCustomer.email),
      searchCustomers("phoneNumber", newCustomer.phoneNumber),
    ]);

    if (emailExists.length > 0) {
      throw new Error("The provided email is already in use.");
    }

    if (phoneExists.length > 0) {
      throw new Error("The provided phone number is already in use.");
    }
    console.log("Inside");
    const encryptedPassword = await hashPassword(newCustomer.password);
    console.log(encryptedPassword);
    const { data } = await axios.post(BASE_URL, {
      ...newCustomer,
      password: encryptedPassword,
    });

    return data;
  } catch (error) {
    throw new Error(`Registration failed: ${error}`);
  }
};

export const modifyCustomer = async (
  customerId: string,
  updateFields: Partial<Customer>
): Promise<Customer> => {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/${customerId}`,
      updateFields
    );
    return data;
  } catch (error) {
    throw new Error(`Update failed for customer ID ${customerId}: ${error}`);
  }
};

export const removeCustomer = async (customerId: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${customerId}`);
  } catch (error) {
    throw new Error(
      `Failed to delete customer with ID ${customerId}: ${error}`
    );
  }
};

export const updateCustomerCart = async (
  customerId: string,
  cartId: string
): Promise<Customer> => {
  try {
    const { data } = await axios.patch(`${BASE_URL}/${customerId}`, {
      cart: cartId,
    });
    return data;
  } catch (error) {
    throw new Error(
      `Failed to update cart for customer ID ${customerId}: ${error}`
    );
  }
};

export const getCustomerAddresses = async (
  customerId: string
): Promise<Address[]> => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${customerId}`);
    console.log(data);
    return data.addressIds;
  } catch (error) {
    throw new Error(`Unable to find customer with ID ${customerId}: ${error}`);
  }
};

export const addAddressToCustomer = async (
  customerId: string,
  newAddress: Address
): Promise<Customer> => {
  try {
    // Fetch existing customer data
    const { data: customer } = await axios.get(`${BASE_URL}/${customerId}`);

    // Add the new address to the address list
    const updatedAddresses = [...customer.addressIds, newAddress];

    // Update the customer with the new addresses
    const { data: updatedCustomer } = await axios.patch(
      `${BASE_URL}/${customerId}`,
      { addressIds: updatedAddresses }
    );

    return updatedCustomer;
  } catch (error) {
    throw new Error(
      `Failed to add address for customer ID ${customerId}: ${error}`
    );
  }
};

export const addOrderToCustomer = async (
  customerId: string,
  cartId: string,
  addressId: string
): Promise<Customer> => {
  try {
    // Fetch the customer and their cart data
    const { data: customer }: { data: Customer } = await axios.get(
      `${BASE_URL}/${customerId}`
    );
    const { data: cart }: { data: Cart } = await axios.get(
      `${config.BASE_URL}/carts/${cartId}`
    );
    const total_amount = await getCartTotal(cartId);

    // Fetch the address details
    const address = customer.addressIds.find(
      (address: Address) => address.id === addressId
    );
    if (!address) {
      throw new Error("Address not found");
    }

    // Map cart items to the order structure
    const products_ordered = await Promise.all(
      cart.items.map(async (cartItem: CartItem) => {
        const { data: product } = await axios.get(
          `${config.BASE_URL}/products/${cartItem.productId}`
        );
        return {
          id: product.id,
          product_count: cartItem.quantity,
          product_details: product,
        };
      })
    );
    // Generate the order model
    const order: OrderModel = {
      id: uuid(), // Example order id
      order_date: new Date().toISOString(),
      total_amount: total_amount, // Assuming cart contains the total amount
      address_details: address,
      products_ordered,
    };

    // Add this new order to the customer's order list
    const updatedOrders = [...customer.orderIds, order];

    // Update the customer record with the new order
    const { data: updatedCustomer } = await axios.patch(
      `${BASE_URL}/${customerId}`,
      { orderIds: updatedOrders }
    );

    return updatedCustomer;
  } catch (error) {
    throw new Error(
      `Failed to add order for customer ID ${customerId}: ${error}`
    );
  }
};
