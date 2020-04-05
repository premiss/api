import { strict as assert } from "assert";
import { ExecutionResult, TimedResult } from "../../src";

export const passedAssert = (timedExecutionResult: TimedResult<ExecutionResult>): void =>
{
	assert.equal(timedExecutionResult.result.passed, true, "The result passed value should be true");
	assert.ok(timedExecutionResult.elapsedNanoseconds > 0, "The result elapsed nanoseconds should be 0");
	assert.equal(timedExecutionResult.result.executionError, undefined, "The result step execution error should be undefined");
};