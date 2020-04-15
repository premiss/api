import { strict as assert } from "assert";
import { ExaminationOutcome } from "../../src/examination";
import { ProofExaminationResult, ProofStep } from "../../src/proof";

interface FailureAssertion
{
	(examResult: ProofExaminationResult, proofStep: ProofStep): void;

	error: Error;
}

const error = new Error("Kaboom!?");
export const failureAssertion = ((examResult: ProofExaminationResult, proofStep: ProofStep): void =>
{
	assert.equal(examResult.examinationOutcome, ExaminationOutcome.Failed, `An exception thrown during ${proofStep} should fail`);
	assert.ok(examResult.examinationError, "The examination error is not defined");
	assert.equal((examResult.examinationError?.error as Error), error, `The examination error should have been the ${error.message} error`);
	assert.equal(examResult.examinationError?.proofStep, proofStep, `The examination error should be for step ${proofStep} but value was ${examResult.examinationError?.proofStep || "undefined"}`);
}) as FailureAssertion;
failureAssertion.error = error;

export const failedAssert = failureAssertion;