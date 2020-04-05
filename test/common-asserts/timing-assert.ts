import { strict as assert } from "assert";
import { ExamResult, ProofStep, TimedResult } from "../../src";
import { StepExecutionResultSet } from "../../src/step-execution";

const sumAllStepsElapsedNanoseconds = (stepExecutionResultSet: StepExecutionResultSet): bigint =>
{
	return stepExecutionResultSet[ProofStep.act].elapsedNanoseconds
		+ stepExecutionResultSet[ProofStep.arrange].elapsedNanoseconds
		+ stepExecutionResultSet[ProofStep.assert].elapsedNanoseconds
		+ stepExecutionResultSet[ProofStep.annul].elapsedNanoseconds;
};

export const timingAssert = (timedExamResult: TimedResult<ExamResult>): void =>
{
	assert.ok(timedExamResult.elapsedNanoseconds > 0, "An exam result should have timing greater than zero");
	const totalStepElapsedNanoseconds = sumAllStepsElapsedNanoseconds(timedExamResult.result.stepExecutionResultSet);
	assert.ok(timedExamResult.elapsedNanoseconds >= totalStepElapsedNanoseconds, `Exam elapsed nanoseconds '${timedExamResult.elapsedNanoseconds}' should be greater than or equal to the sum of all steps time '${totalStepElapsedNanoseconds}'`);
};