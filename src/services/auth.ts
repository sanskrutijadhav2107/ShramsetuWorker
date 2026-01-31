import api from "./api";

/**
 * Register new user (worker)
 * Payload MUST match backend RegisterRequest schema
 */
export const registerUser = async (payload: any) => {
  try {
    const response = await api.post("/register", payload);
    return response.data;
  } catch (error: any) {
    console.log("Register API error:", error?.response?.data || error);
    throw error;
  }
};


export const loginWithPassword = async (
  phone_number: string,
  password: string
) => {
  const res = await api.post("/login", {
    phone_number,
    password,
  });
  return res.data;
};