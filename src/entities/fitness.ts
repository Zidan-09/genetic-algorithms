export class Fitness {
    private readonly calc: (genes: number[]) => number;

    constructor(calc: (genes: number[]) => number) {
        this.calc = calc;
    }

    public evaluate(genes: number[]): number {
        return this.calc(genes);
    }
}