import { ExecutionError } from "./";

export interface ExecutionResult
{
	readonly passed: boolean;
	readonly executionError: Readonly<ExecutionError | undefined>;
}