import Address from "./Address.model";
import Product from "./Product.model";

export interface OrderModel {
  id: string;
  order_date: string;
  total_amount: number;
  address_details: Address;
  products_ordered: {
    id: string;
    product_count: number;
    product_details: Product;
  }[];
}
