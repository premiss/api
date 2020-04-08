import { strict as assert } from "assert";
import { ProofStep } from "../../src";
import { ExaminationResult } from "../../src/examination/examination-result";
import { StepExaminationResultSet } from "../../src/examination/step-examination";
import { TimedResult } from "../../src/timing";

const assertEmptyStep = (proofStep: ProofStep, timedExaminationResult: TimedResult<ExaminationResult>): void =>
{
	assert.equal(timedExaminationResult.result.passed, false, `The ${[proofStep]} passed value should be false`);
	assert.equal(timedExaminationResult.elapsedNanoseconds, BigInt(0), `The ${[proofStep]} elapsed nanoseconds value should be 0, but was ${timedExaminationResult.elapsedNanoseconds} nanoseconds`);
	assert.equal(timedExaminationResult.result.examinationError, undefined, `The ${[proofStep]} examination error should be undefined, but was defined with then message ${(timedExaminationResult.result.examinationError?.error as Error)?.message}`);

};

export const emptyStepAssert = (stepExaminationResultSet: StepExaminationResultSet, ...proofSteps: readonly ProofStep[]): void =>
{
	proofSteps.forEach(proofStep => assertEmptyStep(proofStep, stepExaminationResultSet[proofStep]));
};