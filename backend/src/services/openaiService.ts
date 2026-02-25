const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

async function callGemini(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return `Stub response (missing GEMINI_API_KEY): ${prompt}`;
  }

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ]
    })
  });

  if (!response.ok) {
    return `IA indisponible (${response.status}).`;
  }

  const data = await response.json();
  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    "IA indisponible.";
  return text;
}

export async function generateSummary(journalText: string) {
  const prompt = `Resume la journee : ${journalText}. Indique prieres, etudes, bien-etre. Propose 3 conseils.`;
  return callGemini(prompt);
}

export async function generateQcmSet(topic: string, level: string) {
  const prompt =
    `Genere 5 questions QCM sur ${topic} pour niveau ${level}. ` +
    "Inclure 1 bonne reponse et 3 distracteurs. Donne les reponses et explications.";
  const text = await callGemini(prompt);
  return { prompt: text, questions: [] };
}

export async function gradeQcm(answers: Array<unknown>) {
  const prompt = `Corrige ce QCM et donne un score + explication: ${JSON.stringify(
    answers
  )}`;
  const feedback = await callGemini(prompt);
  return { score: 0, feedback };
}

export async function askAssistant(message: string) {
  const prompt =
    "Reponds sur etudes, organisation, prieres, Coran, productivite. " +
    `Style clair et motivant. Question: ${message}`;
  return callGemini(prompt);
}
