import { ExecutionError } from "../";

export interface StepResult
{
	readonly passed: boolean;
	readonly executionError: ExecutionError | undefined;
}