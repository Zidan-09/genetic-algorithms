export class Counter {
    private nfe: number;

    constructor() {
        this.nfe = 0;
    }

    public getNfe(): number {
        return this.nfe;
    }

    public addNfe(): void {
        this.nfe++;
    }
}