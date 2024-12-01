import axios from "axios";
import { verifyPassword } from "../utils/encrypt";
import { config } from "../utils/config";

interface Admin {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  accessLevel: number;
}

const BASE_URL = `${config.BASE_URL}/admin`;

export const authenticateAdmin = async (
  email: string,
  plainPassword: string
): Promise<Admin> => {
  try {
    const { data } = await axios.get(`${BASE_URL}?email=${email}`);
    const Admin = data[0];

    if (!Admin || !(await verifyPassword(plainPassword, Admin.password))) {
      throw new Error("Invalid credentials. Please try again.");
    }

    return Admin;
  } catch (error) {
    throw new Error(`Authentication failed: ${error}`);
  }
};
