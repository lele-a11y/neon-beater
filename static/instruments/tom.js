import { lerp } from '../synth.js';

export default {
  id: 'tom',
  name: 'Tom',
  color: 'green',
  params: { pitch: 0.35, bend: 0.7, decay: 0.4, tone: 0.3, punch: 0.3, gain: 0.9, distortion: 0 },
  knobs: [
    { key: 'pitch', label: 'Pitch' },
    { key: 'bend', label: 'Bend' },
    { key: 'decay', label: 'Decay' },
    { key: 'tone', label: 'Tone' },
    { key: 'punch', label: 'Punch' },
    { key: 'gain', label: 'Vol' },
    { key: 'distortion', label: 'Dist' }
  ],
  steps: [true,false,false,false,false,false,false,false,true,false,false,false,false,false,false,false],

  play(ctx, time, p, stepGain, destination) {
    const gain = p.gain * stepGain;
    const start = lerp(60, 350, p.pitch);
    const end = lerp(30, start, 1 - p.bend);
    const decay = lerp(0.08, 1.2, p.decay);

    const osc = ctx.createOscillator();
    osc.type = 'sine';

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = lerp(500, 10000, p.tone);

    const g = ctx.createGain();

    osc.frequency.setValueAtTime(start, time);
    osc.frequency.exponentialRampToValueAtTime(Math.max(0.01, end), time + decay);

    g.gain.setValueAtTime(gain, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + decay);

    osc.connect(filter).connect(g).connect(destination);
    osc.start(time);
    osc.stop(time + decay + 0.02);

    if (p.punch > 0) {
      const click = ctx.createOscillator();
      const cg = ctx.createGain();

      click.type = 'triangle';
      click.frequency.setValueAtTime(lerp(150, 1200, p.tone), time);

      cg.gain.setValueAtTime(gain * p.punch * 0.35, time);
      cg.gain.exponentialRampToValueAtTime(0.001, time + 0.025);

      click.connect(cg).connect(destination);
      click.start(time);
      click.stop(time + 0.03);
    }
  }
};
