import { StepExecutionError } from "./";

export interface StepExecutionResult
{
	readonly passed: boolean;
	readonly elapsedNanoseconds: bigint;
	readonly stepExecutionError: Readonly<StepExecutionError | undefined>;
}