import api from "./api";

export const setAvailability = async (available: boolean) => {
  const res = await api.post("/worker/set-availability", {
    available,
  });
  return res.data;
};
