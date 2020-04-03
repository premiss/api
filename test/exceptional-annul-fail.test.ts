import { strict as assert } from "assert";
import { Proof, ProofStep, verify } from "../src/";
import { errorAssert, failedAssert, skippedStepAssert, timingAssert } from "./common-asserts";
import { emptyAsyncVoid } from "./empty-async-void";

export class ExceptionalAnnulFailTest
{
	private readonly proof = new class implements Proof
	{
		public [ProofStep.assert] = emptyAsyncVoid;

		public async [ProofStep.annul](): Promise<void>
		{
			throw errorAssert.error;
		}
	};

	public async test(): Promise<void>
	{
		const examResult = await verify(this.proof);
		failedAssert(examResult, ProofStep.annul);
		errorAssert(examResult.stepExecutionError, ProofStep.annul);
		skippedStepAssert(examResult.stepExecutionResultSet, ProofStep.arrange, ProofStep.act);
		assert.ok(examResult.stepExecutionResultSet[ProofStep.assert].passed, "The assert step should have passed");
		assert.ok(!examResult.stepExecutionResultSet[ProofStep.assert].stepExecutionError, "The assert step should have no step execution error");
		timingAssert(examResult);
	}
}