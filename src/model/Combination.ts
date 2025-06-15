enum Direction {
  Clockwise = "clockwise",
  CounterClockwise = "counterclockwise",
}

type CombinationStep = {
  turns: number; // 1-9
  direction: Direction;
};

export default class Combination {
  private sequence: CombinationStep[] = [];
  private currentDirection: Direction | null = null;

  private addStep(turns: number, direction: Direction) {
    if (turns < 1 || turns > 9) {
      throw new Error("Turns must be between 1 and 9");
    }
    this.sequence.push({ turns, direction });
  }

  private handleTurn(newDirection: Direction): void {
    if (this.currentDirection !== newDirection) {
      this.addStep(1, newDirection);
      this.currentDirection = newDirection;
    } else {
      const lastStep = this.sequence[this.sequence.length - 1];
      if (lastStep) {
        lastStep.turns += 1;
      }
    }
  }

  static newRandom(length = 3): Combination {
    const combination = new Combination();
    let currentDirection =
      Math.random() > 0.5 ? Direction.Clockwise : Direction.CounterClockwise;

    for (let i = 0; i < length; i++) {
      const turns = Math.floor(Math.random() * 9) + 1;
      combination.addStep(turns, currentDirection);
      currentDirection =
        currentDirection === Direction.Clockwise
          ? Direction.CounterClockwise
          : Direction.Clockwise;
    }
    return combination;
  }

  equals(other: Combination): boolean {
    if (this.sequence.length !== other.sequence.length) {
      return false;
    }
    return this.sequence.every(
      (step, i) =>
        step.turns === other.sequence[i].turns &&
        step.direction === other.sequence[i].direction
    );
  }

  isValid(other: Combination) {
    if (other.sequence.length > this.sequence.length) {
      return false;
    }

    return other.sequence.every((step, i) => {
      const isLastStep = i === other.sequence.length - 1;
      const turnsMatch = isLastStep
        ? step.turns <= this.sequence[i].turns
        : step.turns === this.sequence[i].turns;

      return turnsMatch && step.direction === this.sequence[i].direction;
    });
  }

  toString(): string {
    return this.sequence
      .map((step) => `${step.turns} ${step.direction}`)
      .join(", ");
  }

  turnClockwise(): void {
    this.handleTurn(Direction.Clockwise);
  }

  turnCounterClockwise(): void {
    this.handleTurn(Direction.CounterClockwise);
  }
}
