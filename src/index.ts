import { GeneticAlgorithm } from "./core/geneticAlgorithm";
import type { RunConfig } from "./utils/config";
import { Counter } from "./entities/counter";
import { problemsMap, selectionMap } from "./utils/general";
import { Problems } from "./utils/problems";
import { SelectionType } from "./utils/selections";
import { Crossover } from "./entities/crossover";

class Main {
    public static main(): void {
        const runs = 100;

        const use = Problems.CB3;

        const selected = problemsMap[use];

        let totalNfe = 0;
        let success = 0;

        for (let i = 0; i < runs; i++) {
            const counter = new Counter();

            const runConfig: RunConfig = { popSize: 28, generations: 100, mutationRate: 0.07 }

            const ga = new GeneticAlgorithm(
                runConfig,
                selected.config,
                selected.fitness,
                counter
            );

            const result = ga.execute(false);

            totalNfe += counter.getNfe();

            if (Math.abs(result.getFitness()) < 0.01) {
                success++;
            }
        }

        const avgNfe = totalNfe / runs;

        console.log(`nfe: ${avgNfe} | sr: ${success}`);
    }
}

Main.main();