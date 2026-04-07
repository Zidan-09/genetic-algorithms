import { GaUseCase } from "./application/usecase/gaUseCase";
import { problemsMap } from "./domain/maps/maps";
import { Problems } from "./domain/problems/problems";

class Main {
    public static main(): void {
        const tryProblem = Problems.CB3;
        
        const command = problemsMap[tryProblem];

        const output = GaUseCase.execute(command);

        console.log(`nfe: ${output.nfe} | sr: ${output.sr}`);
    }
}

Main.main();