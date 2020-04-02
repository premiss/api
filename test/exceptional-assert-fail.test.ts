import { strict as assert } from "assert";
import { Proof, ProofStep, verify } from "../src/";
import { errorAssert, skippedStepAssert, timingAssert } from "./common-asserts";

export class ExceptionalAssertFailTest
{
	private readonly proof = new class implements Proof
	{
		public async [ProofStep.assert](): Promise<void>
		{
			throw errorAssert.error;
		}
	};

	public async test(): Promise<void>
	{
		const examResult = await verify(this.proof);

		assert.equal(examResult.passed, false, "An exception thrown during assert should fail");
		errorAssert(examResult.stepExecutionError, ProofStep.assert);

		skippedStepAssert(examResult.stepExecutionResultSet, ProofStep.arrange, ProofStep.act);
		timingAssert(examResult);
	}
}