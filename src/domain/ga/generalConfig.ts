import { Fitness } from "./fitness/fitness";
import type { AgConfig } from "./agConfig";

export type GeneralConfig = {
    fitness: Fitness;
    config: AgConfig;
}