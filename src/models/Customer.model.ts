import { User } from "./User.mode";

export default interface Customer extends User {
  phoneNumber: string;
  addressId: string[]; // Reference to Address interface
  cartId: string;
  createdAt: string; // ISO Date String
  updatedAt: string; // ISO Date String
}
