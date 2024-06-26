import bcrypt from "bcrypt";
import config from "../config/encryptConfig";

export async function encrypt(password: string) {
  return await bcrypt.hash(password, config.salt);
}

export async function compare(password: string, passwordHash: string) {
  return await bcrypt.compare(password, passwordHash);
}
