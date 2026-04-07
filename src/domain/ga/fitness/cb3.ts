import { Fitness } from "./fitness";

export const cb3Fitness = new Fitness((genes: number[]) => {
    if (genes.length !== 2) {
        throw new Error("CB3 requires exactly 2 genes");
    }

    const [x, y] = genes;

    if (x == undefined || y == undefined) {
        throw new Error("Invalid genes");
    }

    return (
        2 * x ** 2 -
        1.05 * x ** 4 +
        (x ** 6) / 6 +
        x * y +
        y ** 2
    );
});