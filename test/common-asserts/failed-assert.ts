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
	assert.ok(examResult.stepExecutionError, "The error is not defined");
	assert.equal((examResult.stepExecutionError?.error as Error), error, `The error should have been the ${error.message} error`);
	assert.equal(examResult.stepExecutionError?.proofStep, proofStep, `The error should be for step ${proofStep} but value was ${examResult.stepExecutionError?.proofStep || "undefined"}`);
}) as FailureAssertion;
failureAssertion.error = error;

export const failedAssert = failureAssertion;