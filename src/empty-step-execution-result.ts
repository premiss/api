import { StepExecutionResult } from "./";

export const emptyStepExecutionResult: StepExecutionResult =
	{
		passed: false,
		elapsedNanoseconds: BigInt(0),
		stepExecutionError: undefined
	};