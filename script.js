import { PigGame } from './engine.js';
const game = new PigGame();
const $ = id => document.getElementById(id);
const faces = { 1: [5], 2: [1, 9], 3: [1, 5, 9], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9] };
function render(message, label) {
  for (let i = 0; i < 2; i++) {
    $(`score-${i}`).textContent = game.scores[i];
    $(`current-${i}`).textContent = game.active === i ? game.current : 0;
    $(`progress-${i}`).value = Math.min(100, game.scores[i]);
    $(`player-${i}`).classList.toggle('active', game.winner === null && game.active === i);
    $(`player-${i}`).classList.toggle('winner', game.winner === i);
    $(`turn-${i}`).textContent = game.winner === i ? 'WINNER' : game.winner !== null ? 'WELL PLAYED' : game.active === i ? 'YOUR TURN' : 'UP NEXT';
  }
  $('roll').disabled = game.winner !== null;
  $('hold').disabled = game.winner !== null || game.current === 0;
  $('hold').textContent = game.current ? `Hold ${game.current} points` : 'Hold points';
  $('status').textContent = message;
  $('roll-label').textContent = label;
  $('die').replaceChildren();
  $('die').setAttribute('aria-label', game.die ? `Die shows ${game.die}` : 'No roll yet');
  $('die').classList.toggle('bust', game.die === 1);
  if (game.die) {
    for (let i = 1; i <= 9; i++) { const dot = document.createElement('span'); dot.className = faces[game.die].includes(i) ? 'pip' : 'pip empty'; $('die').append(dot); }
  } else { const mark = document.createElement('span'); mark.className = 'die-placeholder'; mark.textContent = '?'; $('die').append(mark); }
}
$('roll').addEventListener('click', () => {
  const player = game.active + 1;
  const value = Math.floor(Math.random() * 6) + 1;
  if (!game.roll(value)) return;
  render(value === 1 ? `Player ${player} rolled a 1 and lost this turn’s points. Player ${game.active + 1}, you’re up.` : `Player ${player} rolled ${value}. Hold ${game.current} points or roll again.`, value === 1 ? 'THAT’S THE RISK' : 'PRESS YOUR LUCK?');
});
$('hold').addEventListener('click', () => {
  const player = game.active + 1, banked = game.current;
  if (!game.hold()) return;
  render(game.winner !== null ? `Player ${player} wins with ${game.scores[game.winner]} points! Start a new game for a rematch.` : `Player ${player} banked ${banked} points. Player ${game.active + 1}, your turn.`, game.winner !== null ? 'A WELL-TIMED FINISH' : 'SAFE IN THE BANK');
  if (game.winner !== null) $('new').focus({ preventScroll: true });
  else $('roll').focus({ preventScroll: true });
});
$('new').addEventListener('click', () => { game.reset(); render('Player 1 starts. Roll the die to begin.', 'MAKE YOUR FIRST MOVE'); });
render('Player 1 starts. Roll the die to begin.', 'MAKE YOUR FIRST MOVE');
