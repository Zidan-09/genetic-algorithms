import type { GaCommand } from "../command/gaCommand";
import type { GaOutput } from "../output/gaOutput";
import { GeneticAlgorithm } from "../../domain/ga/geneticAlgorithm";
import { Counter } from "../../domain/counter/counter";

export class GaUseCase {
    public static execute(command: GaCommand): GaOutput {
        let totalNfe = 0;
        let success = 0;
        let avgNfe = 0;

        for (let i = 0; i < command.runs; i++) {
            const counter = new Counter();

            const ga = new GeneticAlgorithm(
                command.runConfig,
                command.generalConfig.config,
                command.generalConfig.fitness,
                counter
            );

            const result = ga.execute(false);

            totalNfe += counter.getNfe();

            if (Math.abs(result.getFitness()) < 0.01) {
                success++;
            }
        }

        avgNfe = totalNfe / command.runs;

        return {
            nfe: avgNfe,
            sr: success
        }
    }
}