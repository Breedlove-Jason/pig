# Pig · The Arcade

A two-player, pass-and-play dice game by Jason Breedlove. JavaScript, HTML, and CSS; no account, database, or backend.

## Rules

Player 1 starts. Roll to add points to your turn score. Hold to bank them and pass the die. Rolling a one loses only the current turn's points and passes play to the other person. The first player to **bank 100 or more** wins.

Play together on one device. Use the on-screen Roll and Hold buttons, or Tab to a button and activate it with Enter/Space. The active player is marked with both text and color. Rolling a one stays visible with an explanation. Once a player wins, Roll and Hold are disabled until New game resets the match.

## Run

```sh
npm test
npm run build
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. Serve over HTTP because the code uses ES modules.

## Structure

- `engine.js`: display-independent dice, bank, turn, and win rules
- `script.js`: DOM updates and button controls
- `style.css`: responsive Arcade layout and focus styles
- `tests/engine.test.js`: scoring, forfeits, both players winning, reset, and invalid input checks

Original dice PNGs and the flowchart remain in the source repository. The interface draws die faces with CSS, so gameplay has no image loading dependency. Fonts use a system fallback if Google Fonts is unavailable.

## Deployment

Vercel: Other preset, `npm run build`, output `dist` (provided in `vercel.json`). No environment variables needed. This is a local two-player game, with no computer opponent or online multiplayer.
