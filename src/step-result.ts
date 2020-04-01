import { StepExecutionError } from "./";

export type StepResult = Readonly<{ passed: boolean; stepExecutionError: Readonly<StepExecutionError | undefined>; }>;