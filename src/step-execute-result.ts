import { StepExecutionError } from "./";

export interface StepExecuteResult
{
	readonly passed: boolean;
	readonly stepExecutionError: StepExecutionError | undefined;
}