import { strict as assert } from "assert";
import { Examiner, Proof, ProofStep, skippedStepExecutionResult } from "../src/";
import { errorAssert, timingAssert } from "./common-asserts";

export class ExceptionalAssertFailTest
{
	private readonly proof = new class implements Proof
	{
		public async [ProofStep.assert](): Promise<void>
		{
			throw errorAssert.error;
		}
	};

	public async test(examiner: Readonly<Examiner>): Promise<void>
	{
		const examResult = await examiner.probe(this.proof);

		assert.equal(examResult.passed, false, "An exception thrown during assert should fail");
		errorAssert(examResult.stepExecutionError, ProofStep.assert);

		assert.equal(examResult.stepExecutionResult[ProofStep.arrange], skippedStepExecutionResult, "A skipped step should be the skipped step result");
		assert.equal(examResult.stepExecutionResult[ProofStep.act], skippedStepExecutionResult, "A skipped step should be the skipped step result");

		assert.ok(examResult.elapsedNanoseconds >= (examResult.stepExecutionResult[ProofStep.act].elapsedNanoseconds + examResult.stepExecutionResult[ProofStep.arrange].elapsedNanoseconds + examResult.stepExecutionResult[ProofStep.assert].elapsedNanoseconds), "Exam elapsed nanoseconds should greater than or equal to total step time");

		timingAssert(examResult.elapsedNanoseconds);
	}
}