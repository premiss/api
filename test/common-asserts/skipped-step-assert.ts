import { strict as assert } from "assert";
import { ProofStep } from "../../src";
import { StepExecutionResultSet } from "../../src/step-execution";

export const skippedStepAssert = (stepExecutionResultSet: StepExecutionResultSet, ...proofSteps: readonly ProofStep[]): void =>
{
	for (const proofStep of proofSteps)
	{
		assert.equal(stepExecutionResultSet[proofStep].passed, true, `The ${[proofStep]} passed value should be true`);
		assert.equal(stepExecutionResultSet[proofStep].elapsedNanoseconds, BigInt(0), `The ${[proofStep]} elapsed nanoseconds value should be 0`);
		assert.equal(stepExecutionResultSet[proofStep].stepExecutionError, undefined, `The ${[proofStep]} step execution error value should be undefined`);
	}
};