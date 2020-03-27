import { Examiner, IsochrononFactory, StepExecutorFactory } from "../src";
import { EmptyAssertPassTest } from "./empty-assert-pass.test";
import { ExceptionalActFailTest } from "./exceptional-act-fail.test";
import { ExceptionalArrangeFailTest } from "./exceptional-arrange-fail.test";
import { ExceptionalAssertFailTest } from "./exceptional-assert-fail.test";
import { TestRegistrar } from "./test-registrar";

const registrar = new TestRegistrar();
const isochrononFactory = new IsochrononFactory();
const stepExecutorFactory = new StepExecutorFactory();
const examiner = new Examiner(registrar, isochrononFactory, stepExecutorFactory);
const emptyAssertPassTest = new EmptyAssertPassTest();
const exceptionalAssertFailTest = new ExceptionalAssertFailTest();
const exceptionalActFailTest = new ExceptionalActFailTest();
const exceptionalArrangeFailTest = new ExceptionalArrangeFailTest();

const runTests = async (): Promise<void> =>
{
	await emptyAssertPassTest.test(examiner, registrar);
	await exceptionalAssertFailTest.test(examiner, registrar);
	await exceptionalActFailTest.test(examiner, registrar);
	await exceptionalArrangeFailTest.test(examiner, registrar);
};

runTests().then(() =>
{
	process.exit(0);
}).catch(() =>
{
	process.exit(1);
});