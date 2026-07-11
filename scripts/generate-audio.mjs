import { mkdirSync, writeFileSync } from "node:fs";

const outDir = "public/audio";
const sampleRate = 44100;
mkdirSync(outDir, { recursive: true });

function frequency(note) {
  const semitone = {
    C: -9,
    "C#": -8,
    Db: -8,
    D: -7,
    "D#": -6,
    Eb: -6,
    E: -5,
    F: -4,
    "F#": -3,
    Gb: -3,
    G: -2,
    "G#": -1,
    Ab: -1,
    A: 0,
    "A#": 1,
    Bb: 1,
    B: 2
  };
  const [, name, octaveText] = note.match(/^([A-G]#?|[A-G]b?)(\d)$/) ?? [];
  if (!name) return 0;
  const octave = Number(octaveText);
  return 440 * 2 ** ((semitone[name] + (octave - 4) * 12) / 12);
}

function envelope(t, duration) {
  const attack = Math.min(0.04, duration * 0.16);
  const release = Math.min(0.12, duration * 0.24);
  if (t < attack) return t / attack;
  if (t > duration - release) return Math.max(0, (duration - t) / release);
  return 1;
}

function tone(freq, t) {
  const vibrato = Math.sin(2 * Math.PI * 5.2 * t) * 0.003;
  const f = freq * (1 + vibrato);
  const main = Math.sin(2 * Math.PI * f * t);
  const soft = Math.sin(2 * Math.PI * f * 2 * t) * 0.18;
  const bell = Math.sin(2 * Math.PI * f * 3 * t) * 0.08;
  return main * 0.72 + soft + bell;
}

function renderNotes(notes, options = {}) {
  const tempo = options.tempo ?? 96;
  const beat = 60 / tempo;
  const samples = [];
  let cursor = 0;

  for (const note of notes) {
    const duration = note.beats * beat;
    const count = Math.floor(duration * sampleRate);
    const freq = note.note ? frequency(note.note) : 0;

    for (let index = 0; index < count; index += 1) {
      const t = index / sampleRate;
      const globalTime = cursor + t;
      const env = freq ? envelope(t, duration) : 0;
      const melody = freq ? tone(freq, t) * env * (note.gain ?? 0.22) : 0;
      const padRoot = Math.sin(2 * Math.PI * frequency(note.chord ?? "F3") * globalTime) * 0.025;
      const padFifth = Math.sin(2 * Math.PI * frequency(options.fifth ?? "C4") * globalTime) * 0.018;
      samples.push(Math.max(-0.96, Math.min(0.96, melody + padRoot + padFifth)));
    }

    cursor += duration;
  }

  return samples;
}

function writeWav(filename, samples) {
  const bytesPerSample = 2;
  const blockAlign = bytesPerSample;
  const dataSize = samples.length * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * blockAlign, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  samples.forEach((sample, index) => {
    buffer.writeInt16LE(Math.round(sample * 32767), 44 + index * 2);
  });

  writeFileSync(`${outDir}/${filename}`, buffer);
}

const happyBirthday = [
  ["C4", 0.5], ["C4", 0.5], ["D4", 1], ["C4", 1], ["F4", 1], ["E4", 2],
  ["C4", 0.5], ["C4", 0.5], ["D4", 1], ["C4", 1], ["G4", 1], ["F4", 2],
  ["C4", 0.5], ["C4", 0.5], ["C5", 1], ["A4", 1], ["F4", 1], ["E4", 1], ["D4", 2],
  ["Bb4", 0.5], ["Bb4", 0.5], ["A4", 1], ["F4", 1], ["G4", 1], ["F4", 2],
  [null, 0.75]
].map(([note, beats], index) => ({ note, beats, chord: index < 12 ? "F3" : index < 19 ? "C3" : "Bb3" }));

const ambient = Array.from({ length: 24 }, (_, index) => {
  const notes = ["F4", "A4", "C5", "G4", "Bb4", "A4"];
  return { note: notes[index % notes.length], beats: 1.2, chord: index % 4 < 2 ? "F3" : "Bb3", gain: 0.12 };
});

function sparkle() {
  const samples = [];
  const count = Math.floor(0.8 * sampleRate);
  for (let index = 0; index < count; index += 1) {
    const t = index / sampleRate;
    const env = Math.exp(-5.5 * t);
    const value = (Math.sin(2 * Math.PI * 1568 * t) + Math.sin(2 * Math.PI * 2093 * t) * 0.65) * env * 0.34;
    samples.push(value);
  }
  return samples;
}

function chime() {
  const samples = [];
  const count = Math.floor(1.1 * sampleRate);
  for (let index = 0; index < count; index += 1) {
    const t = index / sampleRate;
    const env = Math.exp(-3.8 * t);
    samples.push((tone(frequency("C5"), t) + tone(frequency("G5"), t) * 0.45) * env * 0.28);
  }
  return samples;
}

function popper() {
  const samples = [];
  const count = Math.floor(0.55 * sampleRate);
  let seed = 7;
  for (let index = 0; index < count; index += 1) {
    const t = index / sampleRate;
    seed = (seed * 16807) % 2147483647;
    const noise = (seed / 2147483647) * 2 - 1;
    const crack = Math.sin(2 * Math.PI * (110 + 620 * t) * t);
    const env = Math.exp(-12 * t);
    samples.push((noise * 0.64 + crack * 0.36) * env * 0.55);
  }
  return samples;
}

writeWav("happy-birthday.wav", renderNotes([...happyBirthday, ...happyBirthday], { tempo: 92, fifth: "C4" }));
writeWav("luxury-celebration.wav", renderNotes(ambient, { tempo: 76, fifth: "C4" }));
writeWav("celebration-chime.wav", chime());
writeWav("popper.wav", popper());
writeWav("sparkle.wav", sparkle());
