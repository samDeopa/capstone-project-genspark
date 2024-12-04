import Product from "../models/Product.model";
import axios from "axios";
import { config } from "../utils/config";
import { v4 as uuid } from "uuid";

const API_ENDPOINT: string | undefined = `${config.BASE_URL}/products`;

/**
 * Fetches all products from the API.
 * @returns A promise resolving to a list of products.
 */
export const fetchAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(API_ENDPOINT);
    return response.data;
  } catch (err) {
    throw new Error(`Error retrieving products: ${err}`);
  }
};

/**
 * Fetches details of a specific product by its ID.
 * @param id - The ID of the product to retrieve.
 * @returns A promise resolving to the product data.
 */
export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(`Error retrieving product with ID ${id}: ${err}`);
  }
};

/**
 * Creates a new product.
 * @param product - The product data without an ID.
 * @returns A promise resolving to the newly created product.
 */
export const addNewProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  try {
    const timestamp = new Date().toISOString();
    const newProduct: Product = {
      ...product,
      id: uuid(),
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    const response = await axios.post(API_ENDPOINT, newProduct);
    return response.data;
  } catch (err) {
    throw new Error(`Error creating product: ${err}`);
  }
};

/**
 * Updates an existing product by its ID.
 * @param id - The ID of the product to update.
 * @param updates - The fields to update.
 * @returns A promise resolving to the updated product data.
 */
export const modifyProduct = async (
  id: string,
  updates: Partial<Product>
): Promise<Product> => {
  try {
    const updatedData = { ...updates, updatedAt: new Date().toISOString() };
    const response = await axios.patch(`${API_ENDPOINT}/${id}`, updatedData);
    return response.data;
  } catch (err) {
    throw new Error(`Error updating product with ID ${id}: ${err}`);
  }
};

/**
 * Deletes a product by its ID.
 * @param id - The ID of the product to delete.
 * @returns A promise resolving to void on successful deletion.
 */
export const removeProduct = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_ENDPOINT}/${id}`);
  } catch (err) {
    throw new Error(`Error deleting product with ID ${id}: ${err}`);
  }
};
