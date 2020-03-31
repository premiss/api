import { Examiner, IsochrononFactory, StepExaminerFactory } from "../src";
import { EmptyAssertPassTest } from "./empty-assert-pass.test";
import { ExceptionalActFailTest } from "./exceptional-act-fail.test";
import { ExceptionalArrangeFailTest } from "./exceptional-arrange-fail.test";
import { ExceptionalAssertFailTest } from "./exceptional-assert-fail.test";
import { TestRegistrar } from "./test-registrar";

const registrar = new TestRegistrar();
const isochrononFactory = new IsochrononFactory();
const stepExaminerFactory = new StepExaminerFactory();
const examiner = new Examiner(registrar, isochrononFactory, stepExaminerFactory);
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
const isochronon = isochrononFactory.createIsochronon();
runTests().then(() =>
{
	console.log(`Test ran successfully in ${isochronon.getElapsedNanoseconds()} nanoseconds`);
	process.exit(0);
}).catch((reason: unknown) =>
{
	console.log(reason);
	process.exit(1);
});