import { strict as assert } from "assert";
import { StepExecutionError } from "../../src";

export const passedAssert = (result: { passed: boolean; elapsedNanoseconds: bigint; stepExecutionError: StepExecutionError | undefined; }): void =>
{
	assert.equal(result.passed, true, "The result passed value should be true");
	assert.ok(result.elapsedNanoseconds > 0, "The result elapsed nanoseconds should be 0");
	assert.equal(result.stepExecutionError, undefined, "The result step execution error should be undefined");
};