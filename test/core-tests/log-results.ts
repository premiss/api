import { TimedResult } from "../../src";
import { TestResult } from "./test-result";

const evaluateTestRun = (timedResult: TimedResult<TestResult>): string =>
{
	return timedResult.result.error
		? `\u001b[31mTest ${timedResult.result.name} failed in ${timedResult.elapsedNanoSeconds} nanoseconds with message: '${timedResult.result.error.message}' and stack trace: '${timedResult.result.error.stack}\u001b[0m'`
		: `\u001b[32mTest ${timedResult.result.name} passed in ${timedResult.elapsedNanoSeconds} nanoseconds\u001b[0m`;
};

export const logResults = (runResults: TimedResult<TimedResult<TestResult>[]>): void =>
{
	for (const testResult of runResults.result)
	{
		console.log(evaluateTestRun(testResult));
	}
	console.log(`\u001b[36mTest run took ${runResults.elapsedNanoSeconds} nanoseconds\u001b[0m`);
};