import usersModel from "../models/users";
import { encrypt } from "../lib/encrypt";

export async function getUserDB(username: string) {
  return await usersModel
    .findOne({ username })
    .select("-password -__v")
    .then((res) => res)
    .catch((err) => null);
}

export async function deleteUserDB(id: string) {
  return await usersModel
    .findByIdAndDelete(id)
    .then((res) => res)
    .catch((err) => null);
}

export async function updatePasswordDB(data: { id: string; password: string }) {
  const { id, password } = data;
  return await usersModel
    .findByIdAndUpdate(id, { password })
    .then((res) => res)
    .catch((err) => null);
}

export async function updateUsernameDB(data: { id: string; username: string }) {
  const { id, username } = data;
  return await usersModel
    .findByIdAndUpdate(id, { username })
    .then((res) => res)
    .catch((err) => null);
}

export async function getPasswordDB(id: string) {
  return await usersModel
    .findById(id)
    .then((res) => (res ? res.password : null))
    .catch((err) => null);
}

export async function getUsernameDB(username: string) {
  return await usersModel
    .findOne({ username })
    .then((res) => (res ? res.username : null))
    .catch((err) => null);
}

export async function getUserById(id: string) {
  return await usersModel
    .findById(id)
    .select("-password -__v")
    .then((res) => res)
    .catch((err) => null);
}

export async function createUserDB(data: {
  email: string;
  username: string;
  password: string;
}) {
  const { email, username, password } = data;
  const hashing = await encrypt(password);

  return await new usersModel({
    username,
    email,
    password: hashing,
    createdAt: Date.now(),
  })
    .save()
    .then((res) => res)
    .catch((err) => false);
}
