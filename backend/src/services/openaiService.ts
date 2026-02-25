const CF_MODEL = "@cf/meta/llama-3.1-8b-instruct";

async function callWorkersAI(prompt: string) {
  const accountId = process.env.CF_ACCOUNT_ID;
  const apiToken = process.env.CF_API_TOKEN;
  if (!accountId || !apiToken) {
    return `Stub response (missing CF_ACCOUNT_ID or CF_API_TOKEN): ${prompt}`;
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${CF_MODEL}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiToken}`
      },
      body: JSON.stringify({ prompt })
    }
  );

  if (!response.ok) {
    return `IA indisponible (${response.status}).`;
  }

  const data = await response.json();
  const text = data?.result?.response ?? "IA indisponible.";
  return text;
}

export async function generateSummary(journalText: string) {
  const prompt = `Resume la journee : ${journalText}. Indique prieres, etudes, bien-etre. Propose 3 conseils.`;
  return callWorkersAI(prompt);
}

export async function generateQcmSet(topic: string, level: string) {
  const prompt =
    `Genere 5 questions QCM sur ${topic} pour niveau ${level}. ` +
    "Inclure 1 bonne reponse et 3 distracteurs. Donne les reponses et explications.";
  const text = await callWorkersAI(prompt);
  return { prompt: text, questions: [] };
}

export async function gradeQcm(answers: Array<unknown>) {
  const prompt = `Corrige ce QCM et donne un score + explication: ${JSON.stringify(
    answers
  )}`;
  const feedback = await callWorkersAI(prompt);
  return { score: 0, feedback };
}

export async function askAssistant(message: string) {
  const prompt =
    "Reponds sur etudes, organisation, prieres, Coran, productivite. " +
    `Style clair et motivant. Question: ${message}`;
  return callWorkersAI(prompt);
}
