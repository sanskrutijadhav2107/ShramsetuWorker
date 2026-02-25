const wordsToDigits: any = {
  zero: "0", one: "1", two: "2", three: "3", four: "4",
  five: "5", six: "6", seven: "7", eight: "8", nine: "9",

  ek: "1", do: "2", teen: "3", char: "4",
  paanch: "5", chhe: "6", saat: "7",
  aath: "8", nau: "9", shunya: "0",
};

export const parsePhoneNumber = (text: string) => {
  if (!text) return "";

  text = text.toLowerCase();

  // If whisper already gave digits
  let digits = text.replace(/\D/g, "");
  if (digits.length >= 10) return digits.slice(-10);

  // Convert spoken words
  const words = text.split(" ");
  digits = "";

  words.forEach((w) => {
    if (wordsToDigits[w]) digits += wordsToDigits[w];
  });

  return digits.length >= 10 ? digits.slice(-10) : "";
};