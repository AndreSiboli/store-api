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
    }
  }
}

export {};
