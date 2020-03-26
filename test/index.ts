import { Examiner, IsochrononFactory } from "../src";
import { EmptyAssertPassTest } from "./empty-assert-pass.test";
import { ExceptionalAssertFailTest } from "./exceptional-assert-fail.test";
import { TestRegistrar } from "./test-registrar";

const registrar = new TestRegistrar();
const isochrononFactory = new IsochrononFactory();
const examiner = new Examiner(registrar, isochrononFactory);
const emptyAssertPassTest = new EmptyAssertPassTest();
const exceptionalAssertFailTest = new ExceptionalAssertFailTest();

const runTests = async (): Promise<void> =>
{
	await emptyAssertPassTest.test(examiner, registrar);
	await exceptionalAssertFailTest.test(examiner, registrar);
};

runTests().finally();