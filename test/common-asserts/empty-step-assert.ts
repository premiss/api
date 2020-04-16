import { strict as assert } from "assert";
import { ExaminationOutcome, ExaminationResult, ExaminationResultSet } from "../../src/examination";
import { ProofStep } from "../../src/proof";
import { TimedResult } from "../../src/timing";

const assertEmptyStep = (proofStep: ProofStep, timedExaminationResult: TimedResult<ExaminationResult>): void =>
{
	assert.equal(timedExaminationResult.result.examinationOutcome, ExaminationOutcome.Unknown, `The ${[proofStep]} examinationOutcome value should be ${ExaminationOutcome.Unknown}`);
	assert.equal(timedExaminationResult.elapsedNanoseconds, BigInt(0), `The ${[proofStep]} elapsed nanoseconds value should be 0, but was ${timedExaminationResult.elapsedNanoseconds} nanoseconds`);
	assert.equal(timedExaminationResult.result.examinationError, undefined, `The ${[proofStep]} examination error should be undefined, but was defined with then message ${(timedExaminationResult.result.examinationError?.error as Error)?.message}`);

};

export const emptyStepAssert = (examinationResultSet: ExaminationResultSet, ...proofSteps: readonly ProofStep[]): void =>
{
	proofSteps.forEach(proofStep => assertEmptyStep(proofStep, examinationResultSet[proofStep]));
};