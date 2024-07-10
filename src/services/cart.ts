import usersModel from "../models/users";

interface DataType {
  userId: string;
  productId: string;
}

interface HowManyType extends DataType {
  howMany: number;
}

export async function getCartItemDB(data: DataType) {
  return await usersModel
    .findById(data.userId)
    .where({ "cart._id": data.productId })
    .select("cart")
    .then((res) => res)
    .catch((err) => null);
}

export async function getCartItemsDB(id: string) {
  return await usersModel
    .findById(id)
    .select("cart")
    .then((res) => res)
    .catch((err) => null);
}

export async function updateCartDB(data: DataType) {
  return await usersModel
    .findByIdAndUpdate(
      data.userId,
      {
        $push: { cart: { _id: data.productId } },
      },
      { new: true }
    )
    .then((res) => res)
    .catch((err) => null);
}

export async function deleteCartItemDB(data: DataType) {
  return await usersModel
    .findByIdAndUpdate(
      data.userId,
      {
        $pull: { cart: { _id: data.productId } },
      },
      { new: true }
    )
    .then((res) => res)
    .catch((err) => null);
}

export async function clearCartDB(data: string) {
  return await usersModel
    .findByIdAndUpdate(
      data,
      {
        $set: { cart: [] },
      },
      { new: true }
    )
    .then((res) => res)
    .catch((err) => null);
}

export async function updateHowManyDB(data: HowManyType) {
  return await usersModel
    .updateOne(
      { _id: data.userId, "cart._id": data.productId },
      {
        $set: { "cart.$.how_many": data.howMany },
      }
    )
    .then((res) => res)
    .catch((err) => null);
}
