// Beat templates: one click replaces the whole palette — which
// instruments are in the room, their patterns, their sound settings
// and the tempo. Steps use the editor's values: 1 on, 0.25 ghost,
// 0 off. Params are partial; missing keys fall back to the
// instrument's defaults.

export const beatTemplates = [
  {
    name: 'Techno', bpm: 128,
    tracks: [
      { instrument: 'kick', params: { pitch: 0.27, bend: 1.0, punch: 0.5, decay: 0.22 }, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
      { instrument: 'hihat', params: { pitch: 0.7, decay: 0.08, body: 0.6, mix: 0.3, gain: 0.55 }, steps: [0.25,0.25,1,0.25, 0.25,0.25,1,0.25, 0.25,0.25,1,0.25, 0.25,0.25,1,0.25] },
      { instrument: 'clap', params: { tone: 0.55, snap: 0.7, spread: 0.5, decay: 0.3, noise: 0.9, gain: 0.85 }, steps: [0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0] },
      { instrument: 'cymbal', params: { pitch: 0.6, metal: 0.9, decay: 0.16, gain: 0.6 }, steps: [1,0,1,0,0,1,0,0, 1,0,1,0,0,1,0,0] },
    ],
  },
  {
    name: 'Boom Bap', bpm: 90,
    tracks: [
      { instrument: 'kick', params: { pitch: 0.2, punch: 0.5, decay: 0.45 }, steps: [1,0,0,0,0,0,1,0, 0,1,0,0,0,0,0.25,0] },
      { instrument: 'snare', params: { tone: 0.35, snap: 0.4, noise: 0.9, decay: 0.45 }, steps: [0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0] },
      { instrument: 'hihat', params: { pitch: 0.55, decay: 0.12, body: 0.5, mix: 0.4, gain: 0.65 }, steps: [1,0.25,1,0.25, 1,0.25,1,0.25, 1,0.25,1,0.25, 1,0.25,1,0.25] },
      { instrument: 'clap', params: { tone: 0.5, snap: 0.5, spread: 0.4, decay: 0.35, noise: 0.7, gain: 0.6 }, steps: [0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0] },
    ],
  },
  {
    name: 'Trap', bpm: 140,
    tracks: [
      { instrument: 'kick', params: { pitch: 0.15, bend: 0.9, punch: 0.6, decay: 0.3, distortion: 0.3 }, steps: [1,0,0,0,0,0.25,0,0, 0,0,1,0,0,0,0.25,0] },
      { instrument: 'snare', params: { tone: 0.5, snap: 0.85, noise: 1.2, decay: 0.25 }, steps: [0,0,0,0,0,0,0,0,1,0,0,0, 0,0,0,0] },
      { instrument: 'hihat', params: { pitch: 0.75, decay: 0.06, body: 0.7, mix: 0.5, gain: 0.7 }, steps: [1,0.25,1,0.25,1,0.25,1,0.25, 1,0.25,1,0.25,0.25,0.25,0.25,0.25,0.25] },
      { instrument: 'rimshot', params: { pitch: 0.65, snap: 0.9, decay: 0.08, noise: 0.5, gain: 0.7 }, steps: [0,0,0,0,0,0,0,0,0.25,0,0,0, 0,0,0,0.25] },
    ],
  },
  {
    name: 'House', bpm: 124,
    tracks: [
      { instrument: 'kick', params: { pitch: 0.25, bend: 0.9, punch: 0.55, decay: 0.25 }, steps: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0] },
      { instrument: 'hihat', params: { pitch: 0.5, decay: 0.28, body: 0.6, mix: 0.5, gain: 0.5 }, steps: [0.25,0,1,0, 0.25,0,1,0, 0.25,0,1,0, 0.25,0,1,0.25] },
      { instrument: 'clap', params: { tone: 0.5, snap: 0.6, spread: 0.55, decay: 0.28, noise: 0.85, gain: 0.8 }, steps: [0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0] },
      { instrument: 'cowbell', params: { pitch: 0, detune: 0.3, tone: 0.6, decay: 0.05, mix: 0.5, gain: 0.6 }, steps: [0,0,1,0,0,0,1,0, 0,0,1,0,0,0,1,0.25] },
    ],
  },
  {
    name: 'Drum & Bass', bpm: 174,
    tracks: [
      { instrument: 'kick', params: { pitch: 0.2, bend: 0.95, punch: 0.65, decay: 0.18, distortion: 0.25 }, steps: [1,0,0,0,0,0,0,0, 0,0,1,0,0,0,0,0] },
      { instrument: 'snare', params: { tone: 0.45, snap: 0.9, noise: 1.4, decay: 0.15, distortion: 0.4 }, steps: [0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0] },
      { instrument: 'hihat', params: { pitch: 0.7, decay: 0.05, body: 0.7, mix: 0.4, gain: 0.7 }, steps: [1,0.25,1,0.25,1,0.25,1,0.25, 1,0.25,1,0.25,1,0.25,1,0.25] },
      { instrument: 'rimshot', params: { pitch: 0.6, snap: 0.85, decay: 0.07, noise: 0.6, gain: 0.65 }, steps: [0,0,0,0,0,0,1,0, 0,0,0,0,0,0,0,0.25] },
    ],
  },
  {
    name: 'Disco', bpm: 115,
    tracks: [
      { instrument: 'kick', params: { pitch: 0.22, punch: 0.5, decay: 0.35 }, steps: [1,0,0,0,0,0,1,0, 0,0,1,0,0,0,0.25,0] },
      { instrument: 'snare', params: { tone: 0.4, snap: 0.6, noise: 1.0, decay: 0.35 }, steps: [0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0.25] },
      { instrument: 'hihat', params: { pitch: 0.55, decay: 0.22, body: 0.5, mix: 0.4, gain: 0.6 }, steps: [0,0,1,0,0,0,1,0, 0,0,1,0,0,0,1,0.25] },
      { instrument: 'clap', params: { tone: 0.5, snap: 0.6, spread: 0.4, decay: 0.3, noise: 0.8, gain: 0.7 }, steps: [0,0,0,0,1,0,0,0, 0,0,0,0,1,0,0,0] },
      { instrument: 'cowbell', params: { pitch: 0, detune: 0.25, tone: 0.55, decay: 0.05, mix: 0.5, gain: 0.65 }, steps: [1,0,0,1,0,0,1,0, 0,0,1,0,0,1,0,0.25] },
    ],
  },
];
