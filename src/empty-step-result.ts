import { StepResult } from "./";

export const emptyStepResult: StepResult =
	{
		passed: false,
		elapsedNanoseconds: BigInt(0),
		stepExecutionError: undefined
	};