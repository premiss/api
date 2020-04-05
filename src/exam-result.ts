import { ExecutionError } from "./";
import { StepExecutionResultSet } from "./step-execution";

export interface ExamResult
{
	readonly passed: boolean;
	readonly executionError: ExecutionError | undefined;
	readonly stepExecutionResultSet: StepExecutionResultSet;
}