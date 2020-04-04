import { StepExecutionError } from "./";

export interface StepResult
{
	readonly passed: boolean;
	readonly stepExecutionError: StepExecutionError | undefined;
}