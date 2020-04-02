import { strict as assert } from "assert";
import { ExamResult } from "../../src";

export const passedAssert = (examResult: ExamResult): void =>
{
	assert.equal(examResult.passed, true, "The exam should have passed");
	assert.equal(examResult.stepExecutionError, undefined, "An passing result should have no error");
};