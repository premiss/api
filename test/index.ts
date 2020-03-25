import { Examiner } from "../src";
import { EmptyAssertPassTest } from "./empty-assert-pass.test";
import { strict as assert } from 'assert';

const examiner = new Examiner();
const examinerPassTest = new EmptyAssertPassTest();

const runTests = async (): Promise<void> => {
	const result = await examiner.probe(examinerPassTest);
	assert.equal(result.passed, true, "An empty assert should pass");
};

runTests().finally();