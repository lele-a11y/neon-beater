import { lerp } from '../synth.js';

export default {
  id: 'cowbell',
  name: 'Cowbell',
  color: 'red',
  params: { pitch: 0.5, detune: 0.4, tone: 0.7, decay: 0.3, mix: 0.5, gain: 0.7, distortion: 0 },
  knobs: [
    { key: 'pitch', label: 'Pitch' },
    { key: 'detune', label: 'Detune' },
    { key: 'tone', label: 'Tone' },
    { key: 'decay', label: 'Decay' },
    { key: 'mix', label: 'Mix' },
    { key: 'gain', label: 'Vol' },
    { key: 'distortion', label: 'Dist' }
  ],
  steps: [false,false,false,false,true,false,false,false,false,false,false,false,true,false,false,false],

  play(ctx, time, p, stepGain, destination) {
    const gain = p.gain * stepGain;
    const duration = lerp(0.06, 0.8, p.decay);
    const base = lerp(350, 1200, p.pitch);

    [1, 1 + p.detune * 0.8].forEach((ratio, i) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();

      osc.type = 'square';
      osc.frequency.value = base * ratio;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = lerp(1000, 10000, p.tone);

      g.gain.setValueAtTime(gain * (i === 0 ? 1 - p.mix * 0.4 : p.mix), time);
      g.gain.exponentialRampToValueAtTime(0.001, time + duration);

      osc.connect(filter).connect(g).connect(destination);
      osc.start(time);
      osc.stop(time + duration + 0.02);
    });
  }
};
