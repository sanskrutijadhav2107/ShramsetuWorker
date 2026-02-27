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


export const getWorkerJobs = async (workerId: number) => {
  const res = await api.get(`/jobs/pending-by-worker/${workerId}`);

  if (res.data?.has_job) {
    return {
      jobs: [res.data.job],
    };
  }

  return {
    jobs: [],
  };
};

export const acceptJob = (jobId: number, workerId: number) =>
  api.post(`/jobs/accept/${jobId}`, null, {
    params: { worker_id: workerId },
  });

export const rejectJob = (jobId: number, workerId: number) =>
  api.post(`/jobs/reject/${jobId}`, null, {
    params: { worker_id: workerId },
  });
