import { Examiner, StepExaminerChainFactory, timedAsyncCall } from "../src";
import { EmptyAssertPassTest } from "./empty-assert-pass.test";
import { ExceptionalActFailTest } from "./exceptional-act-fail.test";
import { ExceptionalArrangeFailTest } from "./exceptional-arrange-fail.test";
import { ExceptionalAssertFailTest } from "./exceptional-assert-fail.test";
import { TestRegistrar } from "./test-registrar";

const registrar = new TestRegistrar();
const stepExaminerChainFactory = new StepExaminerChainFactory();
const examiner = new Examiner(registrar, stepExaminerChainFactory);
const emptyAssertPassTest = new EmptyAssertPassTest();
const exceptionalAssertFailTest = new ExceptionalAssertFailTest();
const exceptionalActFailTest = new ExceptionalActFailTest();
const exceptionalArrangeFailTest = new ExceptionalArrangeFailTest();

const runTests = async (): Promise<void> =>
{
	const timedResult = await timedAsyncCall(async () => {
		await emptyAssertPassTest.test(examiner, registrar);
		await exceptionalAssertFailTest.test(examiner, registrar);
		await exceptionalActFailTest.test(examiner, registrar);
		await exceptionalArrangeFailTest.test(examiner, registrar);
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