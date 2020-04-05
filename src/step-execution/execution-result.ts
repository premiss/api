import { ExecutionError } from "./";

export interface ExecutionResult
{
	readonly passed: boolean;
	readonly elapsedNanoseconds: bigint;
	readonly stepExecutionError: Readonly<ExecutionError | undefined>;
}