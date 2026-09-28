const cache: Record<string, HTMLAudioElement> = {};
const prefix = process.env.__NEXT_ROUTER_BASEPATH ?? "";

const SOURCES = {
  shuffle: `${prefix}/shuffle.mp3`,
  swoosh: `${prefix}/swoosh.mp3`,
  play: `${prefix}/play-card-sm.mp3`,
  place: `${prefix}/place-in-hand.mp3`,
  hand: `${prefix}/single-in-hand.mp3`,
  open: `${prefix}/place-on-table.mp3`,
  table: `${prefix}/play-table.mp3`,
  finish: `${prefix}/finish.mp3`,
  finishh: `${prefix}/finishh.mp3`,

  flickthrough: `${prefix}/flick-through.mp3`,
};

export function playSound(name: keyof typeof SOURCES) {
  if (typeof window === "undefined") return; // skip on the server
  if (!cache[name]) cache[name] = new Audio(SOURCES[name]);
  const s = cache[name];
  s.currentTime = 0;
  s.play().catch((err) => console.log("audio error:", err));
}
