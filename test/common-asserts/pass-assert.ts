import { strict as assert } from "assert";
import { ExaminationResult } from "../../src/examination/examination-result";
import { TimedResult } from "../../src/timing";

export const passedAssert = (timedExecutionResult: TimedResult<ExaminationResult>): void =>
{
	assert.equal(timedExecutionResult.result.passed, true, "The result passed value should be true");
	assert.ok(timedExecutionResult.elapsedNanoseconds > 0, `The result elapsed nanoseconds should be 0, but was ${timedExecutionResult.elapsedNanoseconds} nanoseconds`);
	assert.equal(timedExecutionResult.result.examinationError, undefined, `The result execution error should be undefined, but was defined for step ${timedExecutionResult.result.examinationError?.proofStep} with then message ${(timedExecutionResult.result.examinationError?.error as Error)?.message}`);
};