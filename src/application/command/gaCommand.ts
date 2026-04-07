import type { RunConfig } from "../../domain/ga/runConfig";
import type { GeneralConfig } from "../../domain/ga/generalConfig";

export interface GaCommand {
    runs: number;
    runConfig: RunConfig;
    generalConfig: GeneralConfig;
}