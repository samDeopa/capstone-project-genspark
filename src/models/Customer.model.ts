import { User } from "./User.mode";

export default interface Customer extends User {
  phoneNumber: string;
  addressIds: string[]; // Reference to Address interface
  cartId: string;
  orderIds: [];
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}
