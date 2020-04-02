import { StepExecutionError } from "./";

export type StepResult = Readonly<{ passed: boolean; elapsedNanoseconds: bigint; stepExecutionError: Readonly<StepExecutionError | undefined>; }>;