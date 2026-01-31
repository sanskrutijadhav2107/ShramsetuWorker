import api from "./api";

export const submitRating = async (data: {
  worker_id: string;
  rating: number;
  comment?: string;
}) => {
  const res = await api.post("/ratings/submit", data);
  return res.data;
};

export const getWorkerRating = async (workerId: string) => {
  const res = await api.get(`/ratings/worker/${workerId}`);
  return res.data;
};
