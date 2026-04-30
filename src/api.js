const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "");

export function apiUrl(path) {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not set");
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}
