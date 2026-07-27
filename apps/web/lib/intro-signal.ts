let _done = false;

export function markIntroDone() {
  _done = true;
  window.dispatchEvent(new Event("intro:done"));
}

export function useIntroReady() {
  if (typeof window === "undefined") return false;
  return _done;
}

export function onIntroDone(cb: () => void): () => void {
  if (_done) { cb(); return () => {}; }
  window.addEventListener("intro:done", cb, { once: true });
  return () => window.removeEventListener("intro:done", cb);
}
