import { StepExecutionResult } from "./";

export const skippedStepExecutionResult: StepExecutionResult = {
	passed: true,
	elapsedNanoseconds: BigInt(0),
	stepExecutionError: undefined
};