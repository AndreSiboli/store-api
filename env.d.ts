declare global {
  namespace NodeJS {
    interface ProcessEnv {
      API_SECRET_TOKEN: string;
      API_SECRET_REFRESH_TOKEN: string;
      API_EXPIRES_TOKEN: string;
      API_EXPIRES_REFRESH_TOKEN: string;
      API_SALT: string;
      API_DB_URL: string;
      API_SITE_URL: string;
      API_COOKIE_SAME_SITE: string;
      API_COOKIE_AGE_TOKEN: string;
      API_COOKIE_AGE_REFRESH_TOKEN: string;
    }
  }
}

export {};
