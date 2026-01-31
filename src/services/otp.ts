import api from "./api";

export const generateStartOtp = async (mobile: string) => {
  const response = await api.post("/otp/generate-start", {
    mobile,
  });
  return response.data;
};
