import { timedAsyncCall } from "../../src/timing";
import { emptyAssertPassTest, exceptionalActFailTest, exceptionalAnnulFailTest, exceptionalArrangeFailTest, exceptionalAssertFailTest } from "./";

export const coreTestRunner = async (): Promise<void> =>
{
	const timedResult = await timedAsyncCall(async () =>
	{
		await emptyAssertPassTest();
		await exceptionalAssertFailTest();
		await exceptionalActFailTest();
		await exceptionalArrangeFailTest();
		await exceptionalAnnulFailTest();
	});
	console.log(`Test ran successfully in ${timedResult.elapsedNanoSeconds} nanoseconds`);
};