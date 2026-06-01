const API_BASE_URL = 'https://fakestoreapi.com';
const MAX_RETRIES = 2;

async function fetchWithRetry(url, retries = MAX_RETRIES) {
  for (let i = 0; i <= retries; i++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      clearTimeout();
      if (i === retries) throw error;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

export const fetchProducts = () => fetchWithRetry(`${API_BASE_URL}/products`);

export const fetchProductById = (id) => fetchWithRetry(`${API_BASE_URL}/products/${id}`);

export const fetchCategories = () => fetchWithRetry(`${API_BASE_URL}/products/categories`);

export const fetchProductsByCategory = (category) =>
  fetchWithRetry(`${API_BASE_URL}/products/category/${category}`);

export const toINR = (usdPrice) => usdPrice * 100;
