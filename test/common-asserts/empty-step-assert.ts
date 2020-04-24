import { ExaminationOutcomeUnobserved, ExaminationResult, ExaminationResultSet, ProofStep, TimedResult } from "@premiss/api";
import { strict as assert } from "assert";

const assertEmptyStep = (proofStep: ProofStep, timedExaminationResult: TimedResult<ExaminationResult>): void =>
{
	assert.equal(timedExaminationResult.result.examinationOutcome, ExaminationOutcomeUnobserved.unknown, `The ${[proofStep]} examinationOutcome value should be ${ExaminationOutcomeUnobserved.unknown}`);
	assert.equal(timedExaminationResult.elapsedNanoseconds, BigInt(0), `The ${[proofStep]} elapsed nanoseconds value should be 0, but was ${timedExaminationResult.elapsedNanoseconds} nanoseconds`);
	assert.equal(timedExaminationResult.result.examinationError, undefined, `The ${[proofStep]} examination error should be undefined, but was defined with then message ${(timedExaminationResult.result.examinationError?.error as Error)?.message}`);

};

export const emptyStepAssert = (examinationResultSet: ExaminationResultSet, ...proofSteps: readonly ProofStep[]): void =>
{
	proofSteps.forEach(proofStep => assertEmptyStep(proofStep, examinationResultSet[proofStep]));
};