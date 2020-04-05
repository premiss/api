import { strict as assert } from "assert";
import { ExamResult, ProofStep, TimedResult } from "../../src";

export const timingAssert = (timedExamResult: TimedResult<ExamResult>): void =>
{
	assert.ok(timedExamResult.elapsedNanoseconds > 0, "An exam result should have timing");
	assert.ok(timedExamResult.elapsedNanoseconds >= (timedExamResult.result.stepExecutionResultSet[ProofStep.act].elapsedNanoseconds
		+ timedExamResult.result.stepExecutionResultSet[ProofStep.arrange].elapsedNanoseconds
		+ timedExamResult.result.stepExecutionResultSet[ProofStep.assert].elapsedNanoseconds
		+ timedExamResult.result.stepExecutionResultSet[ProofStep.annul].elapsedNanoseconds), "Exam elapsed nanoseconds should be greater than or equal to the sum of all steps time");
};