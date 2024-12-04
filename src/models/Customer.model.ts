import Address from "./Address.model";
import { OrderModel } from "./Order.model";
import { User } from "./User.mode";

export default interface Customer extends User {
  phoneNumber: string;
  addressIds: Address[]; // Reference to Address interface
  cartId: string;
  orderIds: OrderModel[];
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}
