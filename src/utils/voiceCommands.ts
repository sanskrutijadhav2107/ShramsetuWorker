import Voice from "@react-native-voice/voice";

let callback: ((text: string) => void) | null = null;

export const startListening = async (onResult: (text: string) => void) => {
  callback = onResult;

  Voice.onSpeechResults = (event: any) => {
    const text = event.value?.[0]?.toLowerCase() || "";
    console.log("🎤 Heard:", text);

    if (callback) callback(text);
  };

  try {
    await Voice.start("en-IN");
  } catch (e) {
    console.log("Voice start error", e);
  }
};

export const stopListening = async () => {
  try {
    await Voice.stop();
  } catch (e) {
    console.log("Voice stop error", e);
  }
};