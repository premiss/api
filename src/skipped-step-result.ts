import { StepResult } from "./";

export const skippedStepResult: StepResult = {
	passed: true,
	elapsedNanoseconds: BigInt(0),
	stepExecutionError: undefined
};