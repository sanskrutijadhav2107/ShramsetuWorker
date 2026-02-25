import api from "./api";

export const sendVoiceToBackend = async (uri: string) => {
  const formData = new FormData();

  formData.append("audio", {
    uri,
    name: "speech.m4a",
    type: "audio/m4a",
  } as any);

  const response = await api.post("/voice/transcribe", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};