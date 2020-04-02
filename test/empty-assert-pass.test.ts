import { strict as assert } from "assert";
import { emptyAsyncVoid, Proof, ProofStep, verify } from "../src/";
import { skippedStepAssert, timingAssert } from "./common-asserts";

export class EmptyAssertPassTest
{
	private readonly proof = new class implements Proof
	{
		public [ProofStep.assert] = emptyAsyncVoid;
	};

	public async test(): Promise<void>
	{
		const examResult = await verify(this.proof);

		assert.equal(examResult.passed, true, "An empty assert should pass");
		assert.equal(examResult.stepExecutionError, undefined, "An passing result should have no error");

		skippedStepAssert(examResult.stepExecutionResultSet, ProofStep.arrange, ProofStep.act);
		timingAssert(examResult);
	}
}