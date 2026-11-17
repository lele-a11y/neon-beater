import { lerp } from '../synth.js';

export default {
  id: 'cymbal',
  name: 'Cymbal',
  color: 'lightyellow',
  icon: '<svg class=\'inst-icon\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><ellipse cx=\'12\' cy=\'7\' rx=\'9.5\' ry=\'3.5\'/><path d=\'M12 10.5V20M8.5 20h7\'/></svg>',
  params: { pitch: 0.7, metal: 0.8, resonance: 0.4, decay: 0.6, mix: 0.5, gain: 0.7, distortion: 0 },
  knobs: [
    { key: 'pitch', label: 'Pitch' },
    { key: 'metal', label: 'Metal' },
    { key: 'resonance', label: 'Reso' },
    { key: 'decay', label: 'Decay' },
    { key: 'mix', label: 'Mix' },
    { key: 'gain', label: 'Vol' },
    { key: 'distortion', label: 'Dist' }
  ],
  steps: [false,false,true,false,false,false,true,false,false,false,true,false,false,false,true,false],

  play(ctx, time, p, stepGain, destination) {
    const gain = p.gain * stepGain;
    const duration = lerp(0.1, 2, p.decay);

    const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * duration), ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = lerp(2000, 12000, p.pitch);
    hp.Q.value = lerp(0.5, 15, p.resonance);

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = lerp(3000, 15000, p.metal);
    bp.Q.value = lerp(1, 30, p.resonance);

    const g1 = ctx.createGain();
    const g2 = ctx.createGain();

    g1.gain.setValueAtTime(gain * (1 - p.mix), time);
    g1.gain.exponentialRampToValueAtTime(0.001, time + duration);

    g2.gain.setValueAtTime(gain * p.mix, time);
    g2.gain.exponentialRampToValueAtTime(0.001, time + duration);

    noise.connect(hp).connect(g1).connect(destination);
    noise.connect(bp).connect(g2).connect(destination);

    noise.start(time);
    noise.stop(time + duration + 0.02);
  }
};
