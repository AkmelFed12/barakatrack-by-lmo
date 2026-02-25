export async function generateSummary(journalText: string) {
  const prompt = `Resume la journee : ${journalText}`;
  return `Stub summary for: ${prompt}`;
}

export async function generateQcmSet(topic: string, level: string) {
  const prompt = `Genere 5 questions QCM sur ${topic} pour ${level}`;
  return { prompt, questions: [] };
}

export async function gradeQcm(_answers: Array<unknown>) {
  return { score: 0, feedback: "Stub correction" };
}

export async function askAssistant(message: string) {
  const prompt = `Reponds a: ${message}`;
  return `Stub response for: ${prompt}`;
}
