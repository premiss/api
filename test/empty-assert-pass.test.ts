import { strict as assert } from "assert";
import { emptyAsyncVoid, Proof, ProofStep, skippedStepExecutionResult, verify } from "../src/";
import { timingAssert } from "./common-asserts";

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

		assert.equal(examResult.stepExecutionResultSet[ProofStep.arrange], skippedStepExecutionResult, "A skipped step should be the skipped step result");
		assert.equal(examResult.stepExecutionResultSet[ProofStep.act], skippedStepExecutionResult, "A skipped step should be the skipped step result");

		assert.ok(examResult.elapsedNanoseconds >= (examResult.stepExecutionResultSet[ProofStep.act].elapsedNanoseconds + examResult.stepExecutionResultSet[ProofStep.arrange].elapsedNanoseconds + examResult.stepExecutionResultSet[ProofStep.assert].elapsedNanoseconds), "Exam elapsed nanoseconds should greater than or equal to total step time");

		timingAssert(examResult.elapsedNanoseconds);
	}
}