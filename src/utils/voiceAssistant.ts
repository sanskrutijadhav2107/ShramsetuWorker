import * as Speech from "expo-speech";

let currentLanguage: "en" | "hi" | "mr" = "en";

// called after user selects language
export const setAppLanguage = (lang: "en" | "hi" | "mr") => {
  currentLanguage = lang;
};

// helper → return language code for TTS
const getSpeechCode = () => {
  if (currentLanguage === "hi") return "hi-IN";

  // IMPORTANT:
  // Most Android phones DO NOT have Marathi TTS voice.
  // So we use Hindi engine but Marathi text → it works!
  if (currentLanguage === "mr") return "hi-IN";

  return "en-US";
};

export const speak = (english: string, hindi?: string, marathi?: string) => {
  Speech.stop();

  let message = english;

  if (currentLanguage === "hi" && hindi) message = hindi;
  if (currentLanguage === "mr" && marathi) message = marathi;

  Speech.speak(message, {
    language: getSpeechCode(),
    pitch: 1.0,
    rate: 0.9,
  });
};