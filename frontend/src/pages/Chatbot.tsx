import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../utils/api";

type ChatMessage = { role: "user" | "assistant"; content: string };

const initialMessages: ChatMessage[] = [
  { role: "user", content: "Comment mieux organiser mes revisions?" },
  {
    role: "assistant",
    content: "Planifie 3 blocs de 40 minutes avec pauses courtes."
  }
];

export default function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await apiGet("/chatbot/history");
        if (Array.isArray(res.messages) && res.messages.length > 0) {
          setMessages(
            res.messages.map((msg: { role: string; content: string }) => ({
              role: msg.role === "user" ? "user" : "assistant",
              content: msg.content
            }))
          );
        }
      } catch {
        // keep defaults
      }
    };
    run();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const next: ChatMessage[] = [
      ...messages,
      { role: "user", content: input.trim() }
    ];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await apiPost("/chatbot", { message: input.trim() });
      const reply = res.response ?? "Reponse indisponible.";
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: "Reponse indisponible." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="section-title">
        <h2>Chatbot IA</h2>
        <span className="badge">Motivation et organisation</span>
      </div>

      <section className="grid two">
        <div className="card">
          <h3>Historique</h3>
          <div className="list">
            {messages.map((msg, index) => (
              <div key={`${msg.role}-${index}`}>
                <strong>{msg.role === "user" ? "Utilisateur" : "IA"}:</strong>{" "}
                {msg.content}
              </div>
            ))}
            {loading && <div>Chargement...</div>}
          </div>
        </div>
        <div className="card">
          <h3>Nouvelle question</h3>
          <div className="form">
            <label>Message</label>
            <textarea
              rows={5}
              placeholder="Pose ta question"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <button className="btn primary" onClick={sendMessage} type="button">
              Envoyer
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
