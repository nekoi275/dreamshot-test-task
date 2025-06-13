export default class Combination {
    private readonly sequence: number[];
    private readonly firstDirection: boolean; // true = clockwise, false = counterclockwise
  
    constructor(firstNumber: number, firstDirection: boolean) {
      this.sequence = [firstNumber];
      this.firstDirection = firstDirection;
    }
  
    public addNumber(num: number) {
      this.sequence.push(num)
    }
  
    public equals(other: Combination): boolean {
      if (this.sequence.length !== other.sequence.length) return false;
      return (
        this.sequence.every((val, i) => val === other.sequence[i]) &&
        this.firstDirection === other.firstDirection
      );
    }
  
    public static generateRandom(length = 3): Combination {
      const firstDirection = Math.random() > 0.5;
      const combination = new Combination(Math.floor(Math.random() * 9) + 1, firstDirection);
      for (let i = 1; i < length; i++) {
        combination.addNumber(Math.floor(Math.random() * 9) + 1);
      }
  
      return combination;
    }
  
    public toString(): string {
      return this.sequence.map((num, i) => {
        let direction: string;
        if (i % 2 === 0) {
          direction = this.firstDirection ? "clockwise" : "counterclockwise";
        } else {
          direction = this.firstDirection ? "counterclockwise" : "clockwise";
        }
        return `${num} ${direction}`;
      }).join(", ");
    }
  }
  