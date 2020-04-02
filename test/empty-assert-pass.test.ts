import { strict as assert } from "assert";
import { emptyAsyncVoid, Examiner, Proof, ProofStep, skippedStepResult } from "../src/";
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

		assert.equal(examResult.stepExecutionResult[ProofStep.arrange], skippedStepResult, "A skipped step should be the skipped step result");
		assert.equal(examResult.stepExecutionResult[ProofStep.act], skippedStepResult, "A skipped step should be the skipped step result");

		timingAssert(examResult.elapsedNanoseconds);
	}
}