import { strict as assert } from "assert";
import { ProofExaminationResult, ProofStep } from "../../src/proof";
import { ExaminationResultSet } from "../../src/step-examination";
import { TimedResult } from "../../src/timing";

const sumAllStepsElapsedNanoseconds = (stepExaminationResultSet: ExaminationResultSet): bigint =>
{
	return stepExaminationResultSet[ProofStep.act].elapsedNanoseconds
		+ stepExaminationResultSet[ProofStep.arrange].elapsedNanoseconds
		+ stepExaminationResultSet[ProofStep.assert].elapsedNanoseconds
		+ stepExaminationResultSet[ProofStep.annul].elapsedNanoseconds;
};

export const timingAssert = (timedExamResult: TimedResult<ProofExaminationResult>): void =>
{
	assert.ok(timedExamResult.elapsedNanoseconds > 0, "An exam result should have timing greater than zero");
	const totalStepElapsedNanoseconds = sumAllStepsElapsedNanoseconds(timedExamResult.result.examinationResultSet);
	assert.ok(timedExamResult.elapsedNanoseconds >= totalStepElapsedNanoseconds, `Exam elapsed nanoseconds '${timedExamResult.elapsedNanoseconds}' should be greater than or equal to the sum of all steps time '${totalStepElapsedNanoseconds}'`);
};