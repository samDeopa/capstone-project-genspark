import bcrypt from "bcryptjs";

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(5);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
