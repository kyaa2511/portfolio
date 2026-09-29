const STORAGE_KEY = "orbit-breaker-best";

// Session fallback so the best score still works when storage is unavailable.
let memoryBest = 0;
const listeners = new Set<() => void>();

function readStored(): number {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const value = raw === null ? 0 : Number.parseInt(raw, 10);
    return Number.isFinite(value) && value > 0 ? value : 0;
  } catch {
    return 0;
  }
}

export function readBestScore(): number {
  return Math.max(memoryBest, readStored());
}

export function saveBestScore(score: number): void {
  if (score <= readBestScore()) return;
  memoryBest = score;
  try {
    window.localStorage.setItem(STORAGE_KEY, String(score));
  } catch {
    // Storage is blocked or full; the in-memory value keeps the session working.
  }
  listeners.forEach((listener) => listener());
}

export function subscribeBestScore(onChange: () => void): () => void {
  listeners.add(onChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}
