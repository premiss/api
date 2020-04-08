import { strict as assert } from "assert";
import { ExaminationResult, ProofStep } from "../../src";
import { StepExaminationResultSet } from "../../src/examination/step-examination";
import { TimedResult } from "../../src/timing";

const assertSkippedStep = (proofStep: ProofStep, timedExaminationResult: TimedResult<ExaminationResult>): void =>
{
	assert.equal(timedExaminationResult.result.passed, true, `The ${[proofStep]} passed value should be true`);
	assert.equal(timedExaminationResult.elapsedNanoseconds, BigInt(0), `The ${[proofStep]} elapsed nanoseconds value should be 0, but was ${timedExaminationResult.elapsedNanoseconds} nanoseconds`);
	assert.equal(timedExaminationResult.result.examinationError, undefined, `The ${[proofStep]} examination error should be undefined, but was defined with then message ${(timedExaminationResult.result.examinationError?.error as Error)?.message}`);
};

export const skippedStepAssert = (stepExaminationResultSet: StepExaminationResultSet, ...proofSteps: readonly ProofStep[]): void =>
{
	proofSteps.forEach(proofStep => assertSkippedStep(proofStep, stepExaminationResultSet[proofStep]));
};