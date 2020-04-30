import { TimedResult } from "@premiss/api";
import { TestResult } from "./test-result";

export const throwIfAnyFailed = (runResults: TimedResult<TimedResult<TestResult>[]>): void =>
{
	if (!runResults.result.every(testResult => testResult.result.passed))
	{
		throw new Error("Not all tests passed");
	}
};