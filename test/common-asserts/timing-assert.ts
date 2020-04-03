import { strict as assert } from "assert";
import { ExamResult, ProofStep } from "../../src";

export const timingAssert = (examResult: ExamResult): void =>
{
	assert.ok(examResult.elapsedNanoseconds > 0, "An exam result should have timing");
	assert.ok(examResult.elapsedNanoseconds >= (examResult.stepExecutionResultSet[ProofStep.act].elapsedNanoseconds
		+ examResult.stepExecutionResultSet[ProofStep.arrange].elapsedNanoseconds
		+ examResult.stepExecutionResultSet[ProofStep.assert].elapsedNanoseconds
		+ examResult.stepExecutionResultSet[ProofStep.annul].elapsedNanoseconds), "Exam elapsed nanoseconds should be greater than or equal to the sum of all steps time");
};