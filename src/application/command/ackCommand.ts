import type { RunConfig } from "../../domain/ga/runConfig";
import type { GeneralConfig } from "../../domain/ga/generalConfig";
import type { GaCommand } from "./gaCommand";
import { tournamentSelection } from "../../domain/ga/methods/selection/tournament";
import type { AgConfig } from "../../domain/ga/agConfig";
import { ackFitness } from "../../domain/ga/fitness/ack";
import { blxAlphaCrossover } from "../../domain/ga/methods/crossover/blxAlpha";
import { gaussianMutation } from "../../domain/ga/methods/mutation/gaussian";

const runConfig: RunConfig = {
    popSize: 200,
    generations: 2000,
    mutationRate: 0.1,
    crossover: blxAlphaCrossover,
    mutation: gaussianMutation,
    selection: tournamentSelection
}

const ackConfig: AgConfig = {
    genesSize: 10,
    min: -30,
    max: 30,
    target: 0.01
}

const generalConfig: GeneralConfig = {
    fitness: ackFitness,
    config: ackConfig
}

export const ackCommand: GaCommand = {
    runs: 100,
    runConfig: runConfig,
    generalConfig: generalConfig
}