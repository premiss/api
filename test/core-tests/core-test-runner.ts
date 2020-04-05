import { timedAsyncCall, TimedResult } from "../../src";
import { emptyAssertPassTest } from "./empty-assert-pass.test";
import { exceptionalActFailTest } from "./exceptional-act-fail.test";
import { exceptionalAnnulFailTest } from "./exceptional-annul-fail.test";
import { exceptionalArrangeFailTest } from "./exceptional-arrange-fail.test";
import { exceptionalAssertFailTest } from "./exceptional-assert-fail.test";
import { logResults } from "./log-results";
import { TestResult } from "./test-result";
import { throwIfAnyFailed } from "./throw-if-any-failed";

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
	throwIfAnyFailed(runResults);
};