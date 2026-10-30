import { lerp } from '../synth.js';

export default {
  id: 'rimshot',
  name: 'Rimshot',
  color: 'yellow',
  params: { pitch: 0.5, snap: 0.8, tone: 0.6, decay: 0.12, noise: 0.3, gain: 0.8, distortion: 0 },
  knobs: [
    { key: 'pitch', label: 'Pitch' },
    { key: 'snap', label: 'Snap' },
    { key: 'tone', label: 'Tone' },
    { key: 'decay', label: 'Decay' },
    { key: 'noise', label: 'Noise' },
    { key: 'gain', label: 'Vol' },
    { key: 'distortion', label: 'Dist' }
  ],
  steps: [false,false,false,false,true,false,false,false,false,false,false,false,true,false,false,false],

  play(ctx, time, p, stepGain, destination) {
    const gain = p.gain * stepGain;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.value = lerp(400, 3000, p.pitch);

    g.gain.setValueAtTime(gain * 0.8, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + lerp(0.015, 0.2, p.decay));

    osc.connect(g).connect(destination);
    osc.start(time);
    osc.stop(time + lerp(0.02, 0.21, p.decay));

    if (p.noise > 0) {
      const duration = 0.04;
      const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * duration), ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = lerp(1000, 10000, p.snap);

      const ng = ctx.createGain();
      ng.gain.setValueAtTime(gain * p.noise, time);
      ng.gain.exponentialRampToValueAtTime(0.001, time + duration);

      source.connect(filter).connect(ng).connect(destination);
      source.start(time);
      source.stop(time + duration);
    }
  }
};
