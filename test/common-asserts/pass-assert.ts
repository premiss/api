import { ExaminationOutcomeObserved, ExaminationResult, TimedResult } from "@premiss/api";
import { strict as assert } from "assert";

export const passedAssert = (timedExecutionResult: TimedResult<ExaminationResult>): void =>
{
	assert.equal(timedExecutionResult.result.examinationOutcome, ExaminationOutcomeObserved.passed, `The result examinationOutcome value should be ${ExaminationOutcomeObserved.passed}`);
	assert.ok(timedExecutionResult.elapsedNanoseconds > 0, `The result elapsed nanoseconds should be 0, but was ${timedExecutionResult.elapsedNanoseconds} nanoseconds`);
	assert.equal(timedExecutionResult.result.examinationError, undefined, `The result examination error should be undefined, but was defined for step ${timedExecutionResult.result.examinationError?.proofStep} with then message ${(timedExecutionResult.result.examinationError?.error as Error)?.message}`);
};