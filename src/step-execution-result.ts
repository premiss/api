import { StepExecutionError } from "./";

export type StepExecutionResult = Readonly<{ passed: boolean; elapsedNanoseconds: bigint; stepExecutionError: Readonly<StepExecutionError | undefined>; }>;