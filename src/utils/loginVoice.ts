import { Audio } from "expo-av";
import { sendVoiceToBackend } from "../services/voice";

let recording: Audio.Recording | null = null;

export const startLoginRecording = async () => {
  await Audio.requestPermissionsAsync();

  await Audio.setAudioModeAsync({
    allowsRecordingIOS: true,
    playsInSilentModeIOS: true,
  });

  recording = new Audio.Recording();

  await recording.prepareToRecordAsync({
    android: {
      extension: ".m4a",
      outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
      audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
      sampleRate: 44100,
      numberOfChannels: 1,
      bitRate: 128000,
    },
    ios: {
      extension: ".m4a",
      outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
      audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
      sampleRate: 44100,
      numberOfChannels: 1,
      bitRate: 128000,
    },
  });

  await recording.startAsync();
};

export const stopLoginRecording = async () => {
  if (!recording) return null;

  await new Promise(r => setTimeout(r, 1200)); // minimum 1.2 sec

  await recording.stopAndUnloadAsync();
  const uri = recording.getURI();
  recording = null;

  if (!uri) return null;

  try {
    const data = await sendVoiceToBackend(uri);
    return data.transcript;
  } catch (e) {
    console.log("Voice upload failed:", e);
    return null;
  }
};