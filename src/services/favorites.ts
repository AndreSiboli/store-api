import usersModel from "../models/users";

interface DataType {
  userId: string;
  productId: string;
}

export async function getFavoriteDB(data: DataType) {
  return await usersModel
    .findById(data.userId)
    .where({ favorites: { _id: data.productId } })
    .select("favorites")
    .then((res) => res)
    .catch((err) => null);
}

export async function getFavoritesDB(id: string) {
  return await usersModel
    .findById(id)
    .select("favorites")
    .then((res) => res)
    .catch((err) => null);
}

export async function updateFavoritesDB(data: DataType) {
  return await usersModel
    .findByIdAndUpdate(
      data.userId,
      {
        $push: { favorites: { _id: data.productId } },
      },
      { new: true }
    )
    .then((res) => res)
    .catch((err) => null);
}

export async function deleteFavoriteDB(data: DataType) {
  return await usersModel
    .findByIdAndUpdate(
      data.userId,
      {
        $pull: { favorites: { _id: data.productId } },
      },
      { new: true }
    )
    .then((res) => res)
    .catch((err) => null);
}
