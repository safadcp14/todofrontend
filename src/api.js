const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

function normalizeBaseUrl(url) {
  if (!url) return "";
  const withProtocol = /^https?:\/\//i.test(url) ? url : `https://${url}`;
  return withProtocol.replace(/\/+$/, "");
}

const API_BASE_URL = normalizeBaseUrl(rawBaseUrl);

export function apiUrl(path) {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not set");
  }
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
}
