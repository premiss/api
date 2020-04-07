import { strict as assert } from "assert";
import { ProofStep } from "../../src";
import { StepExaminationResultSet } from "../../src/examination/step-examination";

export const skippedStepAssert = (stepExaminationResultSet: StepExaminationResultSet, ...proofSteps: readonly ProofStep[]): void =>
{
	for (const proofStep of proofSteps)
	{
		assert.equal(stepExaminationResultSet[proofStep].result.passed, true, `The ${[proofStep]} passed value should be true`);
		assert.equal(stepExaminationResultSet[proofStep].elapsedNanoseconds, BigInt(0), `The ${[proofStep]} elapsed nanoseconds value should be 0, but was ${stepExaminationResultSet[proofStep].elapsedNanoseconds} nanoseconds`);
		assert.equal(stepExaminationResultSet[proofStep].result.examinationError, undefined, `The ${[proofStep]} execution error should be undefined, but was defined with then message ${(stepExaminationResultSet[proofStep].result.examinationError?.error as Error)?.message}`);
	}
};