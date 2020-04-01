import { emptyStepResult, ProofStep, StepExecutionResult } from "./";

export const emptyStepExecutionResult: StepExecutionResult = {
	[ProofStep.arrange]: emptyStepResult,
	[ProofStep.act]: emptyStepResult,
	[ProofStep.assert]: emptyStepResult
};