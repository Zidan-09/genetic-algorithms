import type { RunConfig } from "../../domain/ga/runConfig";
import type { GeneralConfig } from "../../domain/ga/generalConfig";
import type { GaCommand } from "./gaCommand";
import { averageCrossover } from "../../domain/ga/methods/crossover/average";
import { localMutation } from "../../domain/ga/methods/mutation/local";
import { cb3Fitness } from "../../domain/ga/fitness/cb3";
import { tournamentSelection } from "../../domain/ga/methods/selection/tournament";
import type { AgConfig } from "../../domain/ga/agConfig";

const runConfig: RunConfig = {
    popSize: 15,
    generations: 100,
    mutationRate: 0.35,
    crossover: averageCrossover,
    mutation: localMutation,
    selection: tournamentSelection
}

const cb3Config: AgConfig = {
    genesSize: 2,
    min: -5,
    max: 5,
    target: 0.01
}

const generalConfig: GeneralConfig = {
    fitness: cb3Fitness,
    config: cb3Config
}

export const cb3Command: GaCommand = {
    runs: 100,
    runConfig: runConfig,
    generalConfig: generalConfig
}