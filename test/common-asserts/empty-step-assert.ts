import { strict as assert } from "assert";
import { emptyStepExecutionResult, ProofStep, StepExecutionResultSet } from "../../src";

export const emptyStepAssert = (stepExecutionResultSet: StepExecutionResultSet, ...proofSteps: readonly ProofStep[]): void =>
{
	for (const proofStep of proofSteps)
	{
		assert.equal(stepExecutionResultSet[proofStep], emptyStepExecutionResult, `The ${[proofStep]} should have been an empty step result`);
	}
};