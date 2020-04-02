import { strict as assert } from "assert";
import { emptyAsyncVoid, emptyStepExecutionResult, Examiner, Proof, ProofStep } from "../src/";
import { errorAssert, timingAssert } from "./common-asserts";

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

	public async test(examiner: Readonly<Examiner>): Promise<void>
	{
		const examResult = await examiner.probe(this.proof);

		assert.equal(examResult.passed, false, "An exception thrown during arrange should fail");
		errorAssert(examResult.stepExecutionError, ProofStep.arrange);

		assert.equal(examResult.stepExecutionResult[ProofStep.act], emptyStepExecutionResult, "An un-executed step should be the empty step result");
		assert.equal(examResult.stepExecutionResult[ProofStep.assert], emptyStepExecutionResult, "An un-executed step should be the empty step result");

		assert.ok(examResult.elapsedNanoseconds >= (examResult.stepExecutionResult[ProofStep.act].elapsedNanoseconds + examResult.stepExecutionResult[ProofStep.arrange].elapsedNanoseconds + examResult.stepExecutionResult[ProofStep.assert].elapsedNanoseconds), "Exam elapsed nanoseconds should greater than or equal to total step time");

		timingAssert(examResult.elapsedNanoseconds);
	}
}