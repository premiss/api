import { TimedResult } from "../../src/timing";
import { TestResult } from "./test-result";

const evaluateTestRun = (timedResult: TimedResult<TestResult>): string =>
{
	return timedResult.result.error
		? `\u001b[31mTest ${timedResult.result.name} failed in ${timedResult.elapsedNanoseconds} nanoseconds with message: '${timedResult.result.error.message}' and stack trace: '${timedResult.result.error.stack}\u001b[0m'`
		: `\u001b[32mTest ${timedResult.result.name} passed in ${timedResult.elapsedNanoseconds} nanoseconds\u001b[0m`;
};

export const logResults = (runResults: TimedResult<TimedResult<TestResult>[]>): void =>
{
	runResults.result.forEach(testResult => console.log(evaluateTestRun(testResult)));
	console.log(`\u001b[36mTest run took ${runResults.elapsedNanoseconds} nanoseconds\u001b[0m`);
};