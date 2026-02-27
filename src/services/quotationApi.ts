
import api from "./api";



export const sendQuotation = async (
  job_id: number,
  worker_id: number,
  quotation: string
) => {
  try {
    const res = await api.post("/jobs/send-quotation", {
      job_id,
      worker_id,
      quotation,
    });

    console.log("QUOTATION RESPONSE:", res.data);
    return res.data;

  } catch (err: any) {
    console.log("QUOTATION ERROR FULL:", err.response?.data || err);
    throw err;
  }
};