import { StepExecutionError, StepExecutionResult } from "./";

export type ExamResult = Readonly<{ passed: boolean; elapsedNanoseconds: bigint; stepExecutionError: Readonly<StepExecutionError | undefined>; stepExecutionResult: StepExecutionResult; }>;