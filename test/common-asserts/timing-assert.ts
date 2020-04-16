import { strict as assert } from "assert";
import { ExaminationResultSet } from "../../src/examination";
import { ProofExaminationResult, ProofStep } from "../../src/proof";
import { TimedResult } from "../../src/timing";

const sumAllStepsElapsedNanoseconds = (examinationResultSet: ExaminationResultSet): bigint =>
{
	return examinationResultSet[ProofStep.act].elapsedNanoseconds
		+ examinationResultSet[ProofStep.arrange].elapsedNanoseconds
		+ examinationResultSet[ProofStep.assert].elapsedNanoseconds
		+ examinationResultSet[ProofStep.annul].elapsedNanoseconds;
};

export const timingAssert = (timedExamResult: TimedResult<ProofExaminationResult>): void =>
{
	assert.ok(timedExamResult.elapsedNanoseconds > 0, "An exam result should have timing greater than zero");
	const totalStepElapsedNanoseconds = sumAllStepsElapsedNanoseconds(timedExamResult.result.examinationResultSet);
	assert.ok(timedExamResult.elapsedNanoseconds >= totalStepElapsedNanoseconds, `Exam elapsed nanoseconds '${timedExamResult.elapsedNanoseconds}' should be greater than or equal to the sum of all steps time '${totalStepElapsedNanoseconds}'`);
};