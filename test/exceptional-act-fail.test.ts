import { strict as assert } from "assert";
import { emptyAsyncVoid, Proof, ProofStep, verify } from "../src/";
import { errorAssert, skippedStepAssert, timingAssert } from "./common-asserts";
import { emptyStepAssert } from "./common-asserts/empty-step-assert";

export class ExceptionalActFailTest
{
	private readonly proof = new class implements Proof
	{
		public async [ProofStep.act](): Promise<void>
		{
			throw errorAssert.error;
		}

		public [ProofStep.assert] = emptyAsyncVoid;
	};

	public async test(): Promise<void>
	{
		const examResult = await verify(this.proof);

		assert.equal(examResult.passed, false, "An exception thrown during act should fail");
		errorAssert(examResult.stepExecutionError, ProofStep.act);

		skippedStepAssert(examResult.stepExecutionResultSet, ProofStep.arrange);
		emptyStepAssert(examResult.stepExecutionResultSet, ProofStep.assert);
		timingAssert(examResult);
	}
}