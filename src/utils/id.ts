export function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

const ADJECTIVES = ["Swift", "Loud", "Clever", "Bold", "Lucky", "Silent", "Fiery", "Calm"];
const NOUNS = ["Striker", "Keeper", "Winger", "Captain", "Fan", "Ref", "Scout", "Rookie"];

export function generateGuestUsername(): string {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const suffix = Math.floor(Math.random() * 100);
  return `${adjective}${noun}${suffix}`;
}
