export function formatSnakeCase(text: string, mode: "sentence" | "title" = "sentence"): string {
  const words = text.split("_").map((w) => w.toLowerCase());

  if (mode === "title") {
    return words.map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }

  const sentence = words.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}
