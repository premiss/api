import { StepExecutionError, StepExecutionResultSet } from "./";

export interface ExamResult
{
	readonly passed: boolean;
	readonly elapsedNanoseconds: bigint;
	readonly stepExecutionError: StepExecutionError | undefined;
	readonly stepExecutionResult: StepExecutionResultSet;
}