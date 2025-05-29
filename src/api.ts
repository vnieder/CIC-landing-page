const API_URL = process.env.REACT_APP_BEDROCK_API_URL!;

export async function getBotReply(message: string): Promise<string> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error(await res.text());
  const { reply } = await res.json();
  return reply;
}
