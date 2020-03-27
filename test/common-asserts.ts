import { strict as assert } from "assert";

export const timingAssert = (value: bigint): void =>
{
	assert.equal(/^[1-9]\d*$/.test(String(value)), true, "An exam result should have timing");
};

interface ErrorAssertion
{
	(error: Error | undefined, message?: string): void;

	error: Error;
}

const errorMessage = "Kaboom!?";
const errorAssertion = ((error: Error | undefined, message: string = errorMessage): void =>
{
	assert.equal(error?.message, message, `The error message should be ${message}`);
}) as ErrorAssertion;
errorAssertion.error = new Error(errorMessage);

export const errorAssert = errorAssertion;