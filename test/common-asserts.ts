import { strict as assert } from "assert";
import { ProofStep, StepExecutionError } from "../src";

export const timingAssert = (value: bigint): void =>
{
	assert.equal(/^[1-9]\d*$/.test(String(value)), true, "An exam result should have timing");
};

interface ErrorAssertion
{
	(stepExecutionError: Readonly<StepExecutionError | undefined>, expectedStep: Readonly<ProofStep>,  message?: string): void;

	error: Error;
}

const errorMessage = "Kaboom!?";
const errorAssertion = ((stepExecutionError: Readonly<StepExecutionError | undefined>, expectedStep: Readonly<ProofStep>, message: Readonly<string> = errorMessage): void =>
{
	assert.ok(stepExecutionError, "The error is not defined");
	assert.equal((stepExecutionError?.error as Error).message, message, `The error message should be ${message}`);
	assert.equal(stepExecutionError?.proofStep, expectedStep, `The error should be for step ${expectedStep} but value was ${stepExecutionError?.proofStep || "undefined"}`);
}) as ErrorAssertion;
errorAssertion.error = new Error(errorMessage);

export const errorAssert = errorAssertion;