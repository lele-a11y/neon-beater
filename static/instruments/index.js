import kick from './kick.js';
import snare from './snare.js';
import hihat from './hihat.js';
import clap from './clap.js';
import tom from './tom.js';
import rimshot from './rimshot.js';
import cymbal from './cymbal.js';
import cowbell from './cowbell.js';

const all = [kick, snare, hihat, clap, tom, rimshot, cymbal, cowbell];

export const instruments = new Map(all.map(i => [i.id, i]));

export const defaultKit = all;
