import { strict as assert } from "assert";
import { ExamResult, ProofStep } from "../../src";

interface FailureAssertion
{
	(examResult: ExamResult, proofStep: ProofStep): void;

	error: Error;
}

const error = new Error("Kaboom!?");
export const failureAssertion = ((examResult: ExamResult, proofStep: ProofStep): void =>
{
	assert.equal(examResult.passed, false, `An exception thrown during ${proofStep} should fail`);
	assert.ok(examResult.examinationError, "The exam execution error is not defined");
	assert.equal((examResult.examinationError?.error as Error), error, `The execution error should have been the ${error.message} error`);
	assert.equal(examResult.examinationError?.proofStep, proofStep, `The execution error should be for step ${proofStep} but value was ${examResult.examinationError?.proofStep || "undefined"}`);
}) as FailureAssertion;
failureAssertion.error = error;

export const failedAssert = failureAssertion;