import Customer from "../models/Customer.model";
import axios from "axios";
import { config } from "../utils/config";
import { hashPassword, verifyPassword } from "../utils/encrypt";

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
