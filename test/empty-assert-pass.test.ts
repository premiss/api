import { strict as assert } from "assert";
import { emptyAsyncVoid, Examiner, Proof, ProofStep } from "../src/";
import { timingAssert } from "./common-asserts";
import { TestRegistrar } from "./test-registrar";

export class EmptyAssertPassTest
{
	private readonly proof = new class implements Proof
	{
		public [ProofStep.assert] = emptyAsyncVoid;
	};

	public async test(examiner: Readonly<Examiner>, testRegistrar: Readonly<TestRegistrar>): Promise<void>
	{
		await examiner.probe(this.proof);
		const examResult = testRegistrar.popLastRecord();
		assert.equal(examResult.passed, true, "An empty assert should pass");
		assert.equal(examResult.stepExecutionError, undefined, "An passing result should have no error");
		timingAssert(examResult.elapsedNanoseconds);
	}
}