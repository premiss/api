import { timedAsyncCall } from "../src";
import { EmptyAssertPassTest } from "./empty-assert-pass.test";
import { ExceptionalActFailTest } from "./exceptional-act-fail.test";
import { ExceptionalArrangeFailTest } from "./exceptional-arrange-fail.test";
import { ExceptionalAssertFailTest } from "./exceptional-assert-fail.test";

const emptyAssertPassTest = new EmptyAssertPassTest();
const exceptionalAssertFailTest = new ExceptionalAssertFailTest();
const exceptionalActFailTest = new ExceptionalActFailTest();
const exceptionalArrangeFailTest = new ExceptionalArrangeFailTest();

const runTests = async (): Promise<void> =>
{
	const timedResult = await timedAsyncCall(async () =>
	{
		await emptyAssertPassTest.test();
		await exceptionalAssertFailTest.test();
		await exceptionalActFailTest.test();
		await exceptionalArrangeFailTest.test();
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