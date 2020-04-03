import { emptyStepExecutionResult, ProofStep, StepExecutionResultSet } from "./";

export const emptyStepExecutionResultSet: StepExecutionResultSet = {
	[ProofStep.arrange]: emptyStepExecutionResult,
	[ProofStep.act]: emptyStepExecutionResult,
	[ProofStep.assert]: emptyStepExecutionResult,
	[ProofStep.annul]: emptyStepExecutionResult
};