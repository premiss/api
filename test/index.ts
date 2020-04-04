import { timedAsyncCall } from "../src";
import { emptyAssertPassTest } from "./empty-assert-pass.test";
import { exceptionalActFailTest } from "./exceptional-act-fail.test";
import { exceptionalAnnulFailTest } from "./exceptional-annul-fail.test";
import { exceptionalArrangeFailTest } from "./exceptional-arrange-fail.test";
import { exceptionalAssertFailTest } from "./exceptional-assert-fail.test";

const runTests = async (): Promise<void> =>
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
runTests().then(() =>
{
	process.exit(0);
}).catch((reason: unknown) =>
{
	console.log(reason);
	process.exit(1);
});