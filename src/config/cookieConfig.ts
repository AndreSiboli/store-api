import "dotenv/config";

export default {
  cookieAgeToken: parseInt(process.env.API_COOKIE_AGE_TOKEN),
  cookieAgeRefreshToken: parseInt(process.env.API_COOKIE_AGE_REFRESH_TOKEN),
  cookieSameSite: process.env.API_COOKIE_SAME_SITE,
} as {
    cookieAgeToken: number
    cookieAgeRefreshToken: number
    cookieSameSite:  boolean | "none" | "strict" | "lax" | undefined
};
