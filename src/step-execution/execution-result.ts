import { StepExecutionError } from "./";

export interface ExecutionResult
{
	readonly passed: boolean;
	readonly elapsedNanoseconds: bigint;
	readonly stepExecutionError: Readonly<StepExecutionError | undefined>;
}