import api from "./api";

export const setAvailability = async (payload: {
  user_id: number;
  is_available: boolean;
}) => {
  const res = await api.post("/worker/set-availability", payload);
  return res.data;
};
