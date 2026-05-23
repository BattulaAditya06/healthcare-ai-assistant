const { GoogleGenAI } =
  require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const extractSymptoms = async (
  message
) => {

  try {

    const prompt = `
Extract only medical symptoms from this sentence.

Return ONLY a JSON array.

Example:
Input:
"I have fever and cough"

Output:
["fever", "cough"]

Sentence:
"${message}"
`;

    const response =
      await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt
      });

    const text =
      response.text;

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);

  } catch (error) {

    console.log(
      "Gemini NLP Error:",
      error.message
    );

    return [];
  }
};

module.exports = {
  extractSymptoms
};