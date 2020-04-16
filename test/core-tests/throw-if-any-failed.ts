import { TimedResult } from "../../src/timing";
import { TestResult } from "./test-result";

export const throwIfAnyFailed = (runResults: TimedResult<TimedResult<TestResult>[]>): void =>
{
	if (runResults.result.find(testResult => !testResult.result.passed))
	{
		throw  new Error("Not all tests passed");
	}
};