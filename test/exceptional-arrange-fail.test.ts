import { strict as assert } from "assert";
import { emptyAsyncVoid, Examiner, Proof, ProofStep } from "../src/";
import { errorAssert, timingAssert } from "./common-asserts";
import { TestRegistrar } from "./test-registrar";

export class ExceptionalArrangeFailTest
{
	private readonly proof = new class implements Proof
	{
		public async [ProofStep.arrange](): Promise<void>
		{
			throw errorAssert.error;
		}

		public [ProofStep.assert] = emptyAsyncVoid;
	};

	public async test(examiner: Readonly<Examiner>, testRegistrar: Readonly<TestRegistrar>): Promise<void>
	{
		await examiner.probe(this.proof);
		const examResult = testRegistrar.popLastRecord();
		assert.equal(examResult.passed, false, "An exception thrown during arrange should fail");
		errorAssert(examResult.stepExecutionError);
		timingAssert(examResult.elapsedNanoseconds);
	}
}