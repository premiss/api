import { Examiner, timedAsyncCall } from "../src";
import { EmptyAssertPassTest } from "./empty-assert-pass.test";
import { ExceptionalActFailTest } from "./exceptional-act-fail.test";
import { ExceptionalArrangeFailTest } from "./exceptional-arrange-fail.test";
import { ExceptionalAssertFailTest } from "./exceptional-assert-fail.test";

const examiner = new Examiner();
const emptyAssertPassTest = new EmptyAssertPassTest();
const exceptionalAssertFailTest = new ExceptionalAssertFailTest();
const exceptionalActFailTest = new ExceptionalActFailTest();
const exceptionalArrangeFailTest = new ExceptionalArrangeFailTest();

const runTests = async (): Promise<void> =>
{
	const timedResult = await timedAsyncCall(async () =>
	{
		await emptyAssertPassTest.test(examiner);
		await exceptionalAssertFailTest.test(examiner);
		await exceptionalActFailTest.test(examiner);
		await exceptionalArrangeFailTest.test(examiner);
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