import { strict as assert } from "assert";
import { ExaminationOutcome, ExaminationResult } from "../../src/examination";
import { TimedResult } from "../../src/timing";

export const passedAssert = (timedExecutionResult: TimedResult<ExaminationResult>): void =>
{
	assert.equal(timedExecutionResult.result.examinationOutcome, ExaminationOutcome.Passed, `The result examinationOutcome value should be ${ExaminationOutcome.Passed}`);
	assert.ok(timedExecutionResult.elapsedNanoseconds > 0, `The result elapsed nanoseconds should be 0, but was ${timedExecutionResult.elapsedNanoseconds} nanoseconds`);
	assert.equal(timedExecutionResult.result.examinationError, undefined, `The result examination error should be undefined, but was defined for step ${timedExecutionResult.result.examinationError?.proofStep} with then message ${(timedExecutionResult.result.examinationError?.error as Error)?.message}`);
};