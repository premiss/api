import { strict as assert } from "assert";
import { ProofStep, skippedStepExecutionResult, StepExecutionResultSet } from "../../src";

export const skippedStepAssert = (stepExecutionResultSet: StepExecutionResultSet, ...proofSteps: readonly ProofStep[]): void =>
{
	for (const proofStep of proofSteps)
	{
		assert.equal(stepExecutionResultSet[proofStep], skippedStepExecutionResult, `The ${[proofStep]} should have been a skipped step result`);
	}
};