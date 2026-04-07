import type { RunConfig } from "../../domain/ga/runConfig";
import type { GeneralConfig } from "../../domain/ga/generalConfig";
import type { GaCommand } from "./gaCommand";
import type { AgConfig } from "../../domain/ga/agConfig";
import { ackFitness } from "../../domain/ga/fitness/ack";
import { blxAlphaCrossover } from "../../domain/ga/methods/crossover/blxAlpha";
import { tournamentSelection } from "../../domain/ga/methods/selection/tournament";
import { localMutation } from "../../domain/ga/methods/mutation/local";

const runConfig: RunConfig = {
    popSize: 45,
    generations: 1000,
    mutationRate: 0.01,
    crossover: blxAlphaCrossover,
    mutation: localMutation,
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