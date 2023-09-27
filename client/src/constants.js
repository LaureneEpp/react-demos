export const API_URL =
  process.env.NODE_ENV === "test"
    ? "http://facked-api-url"
    : import.meta.env.VITE_API_URL;