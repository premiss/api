import { ExecutionError, StepExecutionResultSet } from "./step-execution";

export interface ExamResult
{
	readonly passed: boolean;
	readonly elapsedNanoseconds: bigint;
	readonly executionError: ExecutionError | undefined;
	readonly stepExecutionResultSet: StepExecutionResultSet;
}