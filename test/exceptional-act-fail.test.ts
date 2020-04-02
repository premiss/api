import { strict as assert } from "assert";
import { emptyAsyncVoid, emptyStepExecutionResult, Proof, ProofStep, skippedStepExecutionResult, verify } from "../src/";
import { errorAssert, timingAssert } from "./common-asserts";

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

		assert.equal(examResult.stepExecutionResult[ProofStep.arrange], skippedStepExecutionResult, "A skipped step should be the skipped step result");
		assert.equal(examResult.stepExecutionResult[ProofStep.assert], emptyStepExecutionResult, "An un-executed step should be the empty step result");

		assert.ok(examResult.elapsedNanoseconds >= (examResult.stepExecutionResult[ProofStep.act].elapsedNanoseconds + examResult.stepExecutionResult[ProofStep.arrange].elapsedNanoseconds + examResult.stepExecutionResult[ProofStep.assert].elapsedNanoseconds), "Exam elapsed nanoseconds should greater than or equal to total step time");

		timingAssert(examResult.elapsedNanoseconds);
	}
}