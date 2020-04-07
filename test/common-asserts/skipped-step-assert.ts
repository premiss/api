import { strict as assert } from "assert";
import { ProofStep } from "../../src";
import { StepExecutionResultSet } from "../../src/examination/step-examination";

export const skippedStepAssert = (stepExecutionResultSet: StepExecutionResultSet, ...proofSteps: readonly ProofStep[]): void =>
{
	for (const proofStep of proofSteps)
	{
		assert.equal(stepExecutionResultSet[proofStep].result.passed, true, `The ${[proofStep]} passed value should be true`);
		assert.equal(stepExecutionResultSet[proofStep].elapsedNanoseconds, BigInt(0), `The ${[proofStep]} elapsed nanoseconds value should be 0, but was ${stepExecutionResultSet[proofStep].elapsedNanoseconds} nanoseconds`);
		assert.equal(stepExecutionResultSet[proofStep].result.examinationError, undefined, `The ${[proofStep]} execution error should be undefined, but was defined with then message ${(stepExecutionResultSet[proofStep].result.examinationError?.error as Error)?.message}`);
	}
};