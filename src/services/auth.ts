import usersModel from "../models/users";
import refreshTokenModel from "../models/refreshToken";

interface DatasType {
  user_id: string;
  refresh_token: string;
}

interface UpdateType {
  user_id: string;
  refresh_token: string;
  old_refresh_token: string;
}

export async function getAuthUserDB(email: string) {
  return await usersModel
    .findOne({ email })
    .then((res) => res)
    .catch((err) => null);
}

export async function getRefreshTokenDB(data: DatasType) {
  return await refreshTokenModel
    .findOne({ user_id: data.user_id, refresh_token: data.refresh_token })
    .then((res) => res)
    .catch((err) => null);
}

export async function saveRefreshTokenDB(data: DatasType) {
  const dayInMill = 24 * 60 * 60 * 1000;

  return await new refreshTokenModel({
    refresh_token: data.refresh_token,
    user_id: data.user_id,
    expiresIn: Date.now() + dayInMill,
    updatedIn: Date.now(),
  })
    .save()
    .then((res) => res)
    .catch((err) => null);
}

export async function updateRefreshTokenDB(data: UpdateType) {
  const dayInMill = 24 * 60 * 60 * 1000;

  return await refreshTokenModel
    .findOneAndUpdate(
      { user_id: data.user_id, refresh_token: data.old_refresh_token },
      {
        refresh_token: data.refresh_token,
        expiresIn: Date.now() + dayInMill,
        updatedIn: Date.now(),
      }
    )
    .then((res) => res)
    .catch((err) => null);
}

export async function deleteRefreshTokenDB(data: DatasType) {
  return await refreshTokenModel
    .findOneAndDelete({
      user_id: data.user_id,
      refresh_token: data.refresh_token,
    })
    .then((res) => res)
    .catch((err) => null);
}

export async function manageTokenExpirationDB() {
  return await refreshTokenModel
    .deleteMany()
    .where("expiresIn")
    .lt(Date.now())
    .then((res) => res)
    .catch((err) => null);
}
