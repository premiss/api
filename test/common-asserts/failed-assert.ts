import { strict as assert } from "assert";
import { ExamResult, ProofStep } from "../../src";

export const failedAssert = (examResult: ExamResult, proofStep: ProofStep): void =>
{
	assert.equal(examResult.passed, false, `An exception thrown during ${proofStep} should fail`);
};