import { StepExecutionError } from "./";

export interface StepResult
{
	passed: boolean;
	stepExecutionError: Readonly<StepExecutionError | undefined>;
}