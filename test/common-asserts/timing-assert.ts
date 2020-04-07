import { strict as assert } from "assert";
import { ProofExaminationResult, ProofStep, TimedResult } from "../../src";
import { StepExaminationResultSet } from "../../src/examination/step-examination";

const sumAllStepsElapsedNanoseconds = (stepExaminationResultSet: StepExaminationResultSet): bigint =>
{
	return stepExaminationResultSet[ProofStep.act].elapsedNanoseconds
		+ stepExaminationResultSet[ProofStep.arrange].elapsedNanoseconds
		+ stepExaminationResultSet[ProofStep.assert].elapsedNanoseconds
		+ stepExaminationResultSet[ProofStep.annul].elapsedNanoseconds;
};

export const timingAssert = (timedExamResult: TimedResult<ProofExaminationResult>): void =>
{
	assert.ok(timedExamResult.elapsedNanoseconds > 0, "An exam result should have timing greater than zero");
	const totalStepElapsedNanoseconds = sumAllStepsElapsedNanoseconds(timedExamResult.result.stepExaminationResultSet);
	assert.ok(timedExamResult.elapsedNanoseconds >= totalStepElapsedNanoseconds, `Exam elapsed nanoseconds '${timedExamResult.elapsedNanoseconds}' should be greater than or equal to the sum of all steps time '${totalStepElapsedNanoseconds}'`);
};