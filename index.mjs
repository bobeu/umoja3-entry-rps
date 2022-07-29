import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const stdlib = loadStdlib(process.env);

const startingBalance = stdlib.parseCurrency(100);

const [ accAlice, accBob ] =
  await stdlib.newTestAccounts(2, startingBalance);
console.log('Hello, participants!');

console.log('Initializing RPS...');
const ctcAlice = accAlice.contract(backend);
const ctcBob = accBob.contract(backend, ctcAlice.getInfo());

console.log('Starting backends...');

const HAND = ['Rock', 'Paper', 'Scisssors'];
const OUTCOME = ['Bob wins', 'Draw', 'Alice wins'];

const Player = (player) => ({
  getHand: () => {
    const hand = Math.floor(Math.random() * 3);
    console.log(`${player} played ${HAND[hand]}`);
    return hand;
  },
  seeOutcome: (outcome) => { console.log(`${player} saw outcome ${OUTCOME[outcome]}`)},
})

await Promise.all([
  ctcAlice.p.Alice({ ...Player('Alice'),}),
  ctcBob.p.Bob({ ...Player('Bob'),}),
]);

console.log('Goodbye, Alice and Bob!');
