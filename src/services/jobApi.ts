import api from "./api";

// ---------------- CREATE JOB ----------------
export const createJob = async (payload: {
  customer_id: number;
  worker_user_id: number;
  service_type: string;
  description?: string;
}) => {
  const res = await api.post("/job/jobs/create", payload);
  return res.data;
};

// ---------------- WORKER: GET ASSIGNED JOBS ----------------
export const getWorkerJobs = async (workerUserId: number) => {
  const res = await api.get(`/job/jobs/worker/pending?user_id=${workerUserId}`);
  return res.data;
};
