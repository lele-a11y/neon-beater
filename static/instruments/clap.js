import { lerp } from '../synth.js';

export default {
  id: 'clap',
  name: 'Clap',
  color: 'red',
  params: { tone: 0.5, snap: 0.7, spread: 0.6, decay: 0.25, noise: 0.8, gain: 0.8, distortion: 0 },
  knobs: [
    { key: 'tone', label: 'Tone' },
    { key: 'snap', label: 'Snap' },
    { key: 'spread', label: 'Spread' },
    { key: 'decay', label: 'Decay' },
    { key: 'noise', label: 'Noise' },
    { key: 'gain', label: 'Vol' },
    { key: 'distortion', label: 'Dist' }
  ],
  steps: [false,false,false,false,true,false,false,false,false,false,false,false,true,false,false,false],

  play(ctx, time, p, stepGain, destination) {
    const gain = p.gain * stepGain;
    const duration = lerp(0.08, 0.7, p.decay);
    const bursts = 4 + Math.round(p.spread * 8);
    const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * duration), ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    for (let b = 0; b < bursts; b++) {
      const t = time + b * lerp(0.002, 0.012, p.spread);
      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = lerp(800, 9000, p.tone);
      filter.Q.value = lerp(0.5, 3, p.snap);

      const g = ctx.createGain();
      const level = gain * p.noise * (1 - b / bursts * 0.65);
      g.gain.setValueAtTime(0.001, t);
      g.gain.linearRampToValueAtTime(level, t + 0.001);
      g.gain.exponentialRampToValueAtTime(0.001, t + duration * 0.35);

      source.connect(filter).connect(g).connect(destination);
      source.start(t);
      source.stop(t + duration * 0.4);
    }
  }
};
