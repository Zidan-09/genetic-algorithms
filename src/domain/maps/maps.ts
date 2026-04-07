import { Selection } from "../../domain/ga/methods/selection/selection";
import { Problems } from "../problems/problems";
import { SelectionType } from "../../domain/ga/methods/selection/selectionType";
import { CrossoverType } from "../../domain/ga/methods/crossover/crossoverType";
import { MutationType } from "../../domain/ga/methods/mutation/mutationType";
import { Crossover } from "../../domain/ga/methods/crossover/crossover";
import { Mutation } from "../../domain/ga/methods/mutation/mutation";
import { cb3Command } from "../../application/command/cb3Command";
import { ackCommand } from "../../application/command/ackCommand";
import type { GaCommand } from "../../application/command/gaCommand";
import { tournamentSelection } from "../../domain/ga/methods/selection/tournament";
import { rouletteSelection } from "../../domain/ga/methods/selection/roulette";
import { rankingSelection } from "../../domain/ga/methods/selection/ranking";
import { uniformCrossover } from "../../domain/ga/methods/crossover/uniform";
import { averageCrossover } from "../../domain/ga/methods/crossover/average";
import { blxAlphaCrossover } from "../../domain/ga/methods/crossover/blxAlpha";
import { globalMutation } from "../../domain/ga/methods/mutation/global";
import { localMutation } from "../../domain/ga/methods/mutation/local";
import { gaussianMutation } from "../../domain/ga/methods/mutation/gaussian";

const problemsMap: Record<Problems, GaCommand> = {
    [Problems.CB3]: cb3Command,
    [Problems.ACK]: ackCommand
};

const selectionMap: Record<SelectionType, Selection> = {
    [SelectionType.TOURNAMENT]: tournamentSelection,
    [SelectionType.ROULETTE]: rouletteSelection,
    [SelectionType.RANKING]: rankingSelection
}

const crossoverMap: Record<CrossoverType, Crossover> = {
    [CrossoverType.UNIFORM]: uniformCrossover,
    [CrossoverType.AVERAGE]: averageCrossover,
    [CrossoverType.BLX_ALPHA]: blxAlphaCrossover
};

const mutationMap: Record<MutationType, Mutation> = {
    [MutationType.GLOBAL]: globalMutation,
    [MutationType.LOCAL]: localMutation,
    [MutationType.GAUSSIAN]: gaussianMutation
};

export { problemsMap, selectionMap, crossoverMap, mutationMap }