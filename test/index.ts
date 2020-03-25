import { Examiner } from "../src";
import { EmptyAssertPassTest } from "./empty-assert-pass.test";
import { ExceptionalAssertFailTest } from "./exceptional-assert-fail.test";

const examiner = new Examiner();
const emptyAssertPassTest = new EmptyAssertPassTest();
const exceptionalAssertFailTest = new ExceptionalAssertFailTest();

const runTests = async (): Promise<void> => {
	await emptyAssertPassTest.test(examiner);
	await exceptionalAssertFailTest.test(examiner);
};

runTests().finally();