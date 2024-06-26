import { getRefreshTokenDB } from "../services/auth";

interface DatasType {
  user_id: string;
  refresh_token: string;
}

export async function isRefreshTokenExpired(data: DatasType) {
  const response = await getRefreshTokenDB(data);
  const expiresIn = response?.expiresIn || 0;
  const tokenDate = new Date(expiresIn);
  const currentDate = new Date();

  return currentDate.getTime() > tokenDate.getTime();
}

export async function isRefreshTokenOnDB(data: DatasType) {
  return !!(await getRefreshTokenDB(data));
}
