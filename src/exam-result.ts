import { StepExecutionError, StepExecutionResultSet } from "./step-execution";

export interface ExamResult
{
	readonly passed: boolean;
	readonly elapsedNanoseconds: bigint;
	readonly stepExecutionError: StepExecutionError | undefined;
	readonly stepExecutionResultSet: StepExecutionResultSet;
}