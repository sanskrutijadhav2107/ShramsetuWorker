// import api from "./api";

// export const getBookedJob = async (workerId: number) => {
//   const res = await api.get(`/jobs/worker-booked/${workerId}`);
//   return res.data;
// };

// export const acceptBookedJob = async (jobId: number, workerId: number) => {
//   const res = await api.post(`/jobs/accept/${jobId}?worker_id=${workerId}`);
//   return res.data;
// };










import api from "./api";

/* Get job booked by customer */
export const getBookedJob = async (workerId: number) => {
  const res = await api.get(`/jobs/worker-booked/${workerId}`);
  return res.data;
};

/* Worker confirms he reached location */
export const acceptBookedJob = async (jobId: number, workerId: number) => {
  const res = await api.post(
    `/jobs/accept/${jobId}?worker_id=${workerId}`
  );
  return res.data;
};





export const getActiveJob = async (workerId: number) => {
  const res = await api.get(`/jobs/worker-active/${workerId}`);
  return res.data;
};

export const startJob = async (jobId: number, otp: string) => {
  const res = await api.post(`/jobs/start/${jobId}`, { otp });
  return res.data;
};

export const completeJob = async (jobId: number, otp: string) => {
  const res = await api.post(`/jobs/complete/${jobId}`, { otp });
  return res.data;
};





export const getWorkerHistory = async (workerId: number) => {
  const res = await api.get(`/jobs/worker-history/${workerId}`);
  return res.data;
};