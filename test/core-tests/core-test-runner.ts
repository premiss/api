import { timedAsyncCall, TimedResult } from "../../src";
import { emptyAssertPassTest, exceptionalActFailTest, exceptionalAnnulFailTest, exceptionalArrangeFailTest, exceptionalAssertFailTest } from "./";
import { logResults } from "./log-results";
import { TestResult } from "./test-result";

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