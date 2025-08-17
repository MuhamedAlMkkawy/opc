// composables/useApiFetch.js
import { useGlobalStore } from "@/stores/globalStore";

// Common options configuration function
const createFetchOptions = (authed , options = {}) => {
  const token = useAuthStore()?.userData?.token || ''; // You can fetch the actual token from auth storage
  const lang = useCookie('i18n_redirected')?.value || 'en';
  const config = useRuntimeConfig();
  const baseURL = options.baseURL || config.public.apiBase;


  const headers = {
    ...(authed ? { Authorization: `Bearer ${token}` } : {}),
    lang: lang,
    ...options.headers,
  };

  return {
    baseURL,
    headers,
    responseType: "json",
    ...options,
  };
};


// For data fetching with useFetch
export const useApiFetch = (url, authed ,options = {}) => {
  return useFetch(url, {
    params: options.params || {}, // Set default params if none provided
    ...createFetchOptions(authed , options),
    method: "GET",
  });
};

// Unified fetch function
const fetchData = async (url , authed , options = {}, method) => {
  try {
    const response = await $fetch(url, {
      ...createFetchOptions(authed , options),
      method,
      body: options.body || undefined, // Ensure body is included if it exists
    });

    // Directly return the response
    return { data: response, error: null };
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return { data: null, error };
  }
};

// For data fetching with $fetch
export const fetchApiData = (url, authed ,options = {}) => {
  return fetchData(url, authed ,options, "GET"); // Call the unified fetch with GET method
};

// For form submission or other requests with $fetch
export const submitApiForm = (url, authed , formData, method = "POST", options = {}) => {
  return fetchData(url, authed ,{ ...options, body: formData }, method); // Include formData and dynamic method in options
};
