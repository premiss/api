import { timedAsyncCall, TimedResult } from "../../src/timing";
import { emptyAssertPassTest, exceptionalActFailTest, exceptionalAnnulFailTest, exceptionalArrangeFailTest, exceptionalAssertFailTest } from "./";

type TestResult = { passed: boolean; name: string; error: Error | undefined; };

const runTest = async (test: () => Promise<void>): Promise<TimedResult<TestResult>> =>
{
	return await timedAsyncCall(async () =>
	{
		try
		{
			await test();
			return { passed: true, name: test.name, error: undefined };
		}
		catch (error)
		{
			return { passed: false, name: test.name, error: error };
		}
	});
};

const evaluateTestRun = (timedResult: TimedResult<TestResult>): string =>
{
	return timedResult.result.error
		? `\u001b[31mTest ${timedResult.result.name} failed in ${timedResult.elapsedNanoSeconds} nanoseconds with message: '${timedResult.result.error.message}' and stack trace: '${timedResult.result.error.stack}\u001b[0m'`
		: `\u001b[32mTest ${timedResult.result.name} passed in ${timedResult.elapsedNanoSeconds} nanoseconds\u001b[0m`;
};

const logResults = (runResults: TimedResult<TimedResult<TestResult>[]>): void =>
{
	for (const testResult of runResults.result)
	{
		console.log(evaluateTestRun(testResult));
	}
	console.log(`\u001b[36mTest run took ${runResults.elapsedNanoSeconds} nanoseconds\u001b[0m`);
};

export const coreTestRunner = async (): Promise<void> =>
{
	const runResults = await timedAsyncCall(async () =>
	{
		return [
			await runTest(emptyAssertPassTest),
			await runTest(exceptionalArrangeFailTest),
			await runTest(exceptionalActFailTest),
			await runTest(exceptionalAssertFailTest),
			await runTest(exceptionalAnnulFailTest)
		];
	});
	logResults(runResults);
};