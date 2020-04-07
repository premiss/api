import { ExecutionError } from "./";
import { StepExecutionResultSet } from "./execution/step-examination";

export interface ExamResult
{
	readonly passed: boolean;
	readonly executionError: ExecutionError | undefined;
	readonly stepExecutionResultSet: StepExecutionResultSet;
}