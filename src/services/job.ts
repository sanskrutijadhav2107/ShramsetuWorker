import api from "./api";

export const createJob = async (data: {
  title: string;
  location: string;
  wage: number;
}) => {
  const res = await api.post("/job/jobs/create", data);
  return res.data;
};

export const acceptJob = async (jobId: string) => {
  const res = await api.post("/job/accept", { job_id: jobId });
  return res.data;
};

export const rejectJob = async (jobId: string) => {
  const res = await api.post("/job/reject", { job_id: jobId });
  return res.data;
};

export const completeJob = async (jobId: string) => {
  const res = await api.post("/job/jobs/complete", { job_id: jobId });
  return res.data;
};

export const matchWorker = async (jobId: string) => {
  const res = await api.post("/job/match-worker", { job_id: jobId });
  return res.data;
};
