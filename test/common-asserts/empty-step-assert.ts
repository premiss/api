import { strict as assert } from "assert";
import { ProofStep } from "../../src";
import { StepExecutionResultSet } from "../../src/step-execution";

export const emptyStepAssert = (stepExecutionResultSet: StepExecutionResultSet, ...proofSteps: readonly ProofStep[]): void =>
{
	for (const proofStep of proofSteps)
	{
		assert.equal(stepExecutionResultSet[proofStep].passed, false, `The ${[proofStep]} passed value should be false`);
		assert.equal(stepExecutionResultSet[proofStep].elapsedNanoseconds, BigInt(0), `The ${[proofStep]} elapsed nanoseconds value should be 0`);
		assert.equal(stepExecutionResultSet[proofStep].executionError, undefined, `The ${[proofStep]} step execution error value should be undefined`);
	}
};