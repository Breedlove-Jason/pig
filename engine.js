export class PigGame {
  constructor() { this.reset(); }
  reset() { this.scores = [0, 0]; this.current = 0; this.active = 0; this.die = null; this.winner = null; }
  next() { this.current = 0; this.active = 1 - this.active; }
  roll(value) {
    if (this.winner !== null) return false;
    if (!Number.isInteger(value) || value < 1 || value > 6) throw new RangeError('Die must be 1–6');
    this.die = value;
    if (value === 1) this.next(); else this.current += value;
    return true;
  }
  hold() {
    if (this.winner !== null || this.current === 0) return false;
    this.scores[this.active] += this.current;
    this.current = 0;
    if (this.scores[this.active] >= 100) this.winner = this.active;
    else this.next();
    return true;
  }
}
