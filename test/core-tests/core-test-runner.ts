import { timedAsyncCall, TimedResult } from "../../src/timing";
import { emptyAssertPassTest, exceptionalActFailTest, exceptionalAnnulFailTest, exceptionalArrangeFailTest, exceptionalAssertFailTest } from "./";

const runTest = async (test: () => Promise<void>): Promise<TimedResult<Error | undefined>> =>
{
	return await timedAsyncCall(async () =>
	{
		try
		{
			await test();
			return undefined;
		}
		catch (error)
		{
			return error;
		}
	});
};

export const coreTestRunner = async (): Promise<void> =>
{
	const timedResult = await timedAsyncCall(async () =>
	{
		console.log(await runTest(emptyAssertPassTest));
		console.log(await runTest(exceptionalAssertFailTest));
		console.log(await runTest(exceptionalActFailTest));
		console.log(await runTest(exceptionalArrangeFailTest));
		console.log(await runTest(exceptionalAnnulFailTest));
	});
	console.log(`Test run took in ${timedResult.elapsedNanoSeconds} nanoseconds`);
};