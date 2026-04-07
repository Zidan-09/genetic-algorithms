export class Individual {
    private genes: number[];
    private fitness: number;

    constructor(genes: number[], fitness: number) {
        this.genes = genes;
        this.fitness = fitness;
    }

    public getGenes(): number[] {
        return this.genes;
    }

    public getFitness(): number {
        return this.fitness;
    }

    public mutateGenes(newGenes: number[]): void {
        this.genes = newGenes;
    }

    public setFitness(fitness: number): void {
        this.fitness = fitness;
    }
}