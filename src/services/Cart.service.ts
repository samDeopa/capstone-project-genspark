import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { config } from "../utils/config";
import { Cart, CartItem } from "../models/Cart.model";
import { fetchProductById } from "./Product.service";

const BASE_URL: string = `${config.BASE_URL}/carts`;

// Retrieve all carts
export const getAllCarts = async (): Promise<Cart[]> => {
  try {
    const { data } = await axios.get<Cart[]>(BASE_URL);
    return data;
  } catch (error: any) {
    throw new Error(
      `Failed to fetch all carts. ${error.response?.status}: ${error.message}`
    );
  }
};

// Retrieve a cart by ID
export const getCartById = async (id: string): Promise<Cart> => {
  try {
    const { data } = await axios.get<Cart>(`${BASE_URL}/${id}`);
    return data;
  } catch (error: any) {
    throw new Error(
      `Failed to fetch cart with ID ${id}. ${error.response?.status}: ${error.message}`
    );
  }
};

// Create a new cart
export const createCart = async (cart: Omit<Cart, "id">): Promise<Cart> => {
  try {
    const newCart: Cart = { ...cart, id: uuidv4() };
    const { data } = await axios.post<Cart>(BASE_URL, newCart);
    return data;
  } catch (error: any) {
    throw new Error(
      `Failed to create a new cart. ${error.response?.status}: ${error.message}`
    );
  }
};

// Update an existing cart
export const updateCart = async (
  id: string,
  updates: Partial<Omit<Cart, "id">>
): Promise<Cart> => {
  try {
    const { data } = await axios.put<Cart>(`${BASE_URL}/${id}`, updates);
    return data;
  } catch (error: any) {
    throw new Error(
      `Failed to update cart with ID ${id}. ${error.response?.status}: ${error.message}`
    );
  }
};

// Delete a cart by ID
export const deleteCart = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error: any) {
    throw new Error(
      `Failed to delete cart with ID ${id}. ${error.response?.status}: ${error.message}`
    );
  }
};

// Delete a specific item from a cart
export const deleteCartItem = async (
  cartId: string,
  productId: string
): Promise<Cart> => {
  try {
    const cart = await getCartById(cartId);
    const updatedCart = {
      ...cart,
      items: cart.items.filter((item) => item.productId !== productId),
    };
    const { data } = await axios.put<Cart>(
      `${BASE_URL}/${cartId}`,
      updatedCart
    );
    return data;
  } catch (error: any) {
    throw new Error(
      `Failed to delete item with Product ID ${productId} from cart ${cartId}. ${error.response?.status}: ${error.message}`
    );
  }
};

export const addProductToCart = async (cartId: string, productId: string) => {
  try {
    // Fetch the current cart details
    const { data: cart } = await axios.get<{
      items: { productId: string; quantity: number }[];
    }>(`${BASE_URL}/${cartId}`);

    // Check if the product already exists in the cart
    const productIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (productIndex !== -1) {
      // Increment the product quantity
      cart.items[productIndex].quantity += 1;
    } else {
      // Add the product with quantity = 1
      cart.items.push({ productId, quantity: 1 });
    }

    // Update the cart
    await axios.put(`${BASE_URL}/${cartId}`, { items: cart.items });

    return { success: true, message: "Product added to cart successfully." };
  } catch (error: any) {
    console.error("Error adding product to cart:", error);
    throw new Error(
      `Failed to add product to cart. ${
        error.response?.status || "Unknown Error"
      }: ${error.response?.data?.message || error.message}`
    );
  }
};
export const removeProductFromCart = async (
  cartId: string,
  productId: string
): Promise<void> => {
  try {
    // Fetch the cart
    const { data: cart } = await axios.get(`${BASE_URL}/${cartId}`);

    // Filter out the product to be removed
    const updatedItems = cart.items.filter(
      (item: { productId: string }) => item.productId !== productId
    );

    // Update the cart with the new items array
    await axios.put(`${BASE_URL}/${cartId}`, {
      ...cart,
      items: updatedItems,
    });
  } catch (error: any) {
    throw new Error(
      `Failed to remove product with ID ${productId} from cart. ${error.response?.status}: ${error.message}`
    );
  }
};

export const incrementProductQuantity = async (
  cartId: string,
  productId: string
): Promise<void> => {
  try {
    // Fetch the cart
    const { data: cart } = await axios.get(`${BASE_URL}/${cartId}`);

    // Update the quantity of the product
    const updatedItems = cart.items.map(
      (item: { productId: string; quantity: number }) => {
        if (item.productId === productId) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      }
    );

    // Update the cart with the new items array
    await axios.put(`${BASE_URL}/${cartId}`, {
      ...cart,
      items: updatedItems,
    });
  } catch (error: any) {
    throw new Error(
      `Failed to increment quantity for product with ID ${productId}. ${error.response?.status}: ${error.message}`
    );
  }
};

export const decrementProductQuantity = async (
  cartId: string,
  productId: string
): Promise<void> => {
  try {
    // Fetch the cart
    const { data: cart } = await axios.get(`${BASE_URL}/${cartId}`);

    // Update the quantity of the product or remove it if quantity is 1
    const updatedItems = cart.items
      .map((item: { productId: string; quantity: number }) => {
        if (item.productId === productId) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return null; // Mark for removal
        }
        return item;
      })
      .filter((item: CartItem) => item !== null);
    // Update the cart with the new items array
    await axios.put(`${BASE_URL}/${cartId}`, {
      ...cart,
      items: updatedItems,
    });
  } catch (error: any) {
    throw new Error(
      `Failed to decrement quantity for product with ID ${productId}. ${error.response?.status}: ${error.message}`
    );
  }
};
export const getCartTotal = async (cartId: string): Promise<number> => {
  try {
    const { data: cart } = await axios.get(`${BASE_URL}/${cartId}`);
    let total = 0;

    for (const item of cart.items) {
      const { price } = await fetchProductById(item.productId);
      total += price * item.quantity;
    }

    return total;
  } catch (error) {
    throw new Error(`Failed to calculate cart total. ${error}`);
  }
};

export const clearCart = async (cartId: string): Promise<void> => {
  try {
    // Fetch the cart
    const { data: cart } = await axios.get(`${BASE_URL}/${cartId}`);

    await axios.put(`${BASE_URL}/${cartId}`, {
      ...cart,
      items: [],
    });
  } catch (error: any) {
    throw new Error(
      `Failed to clear product  from cart. ${error.response?.status}: ${error.message}`
    );
  }
};
