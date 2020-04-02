import { strict as assert } from "assert";
import { emptyAsyncVoid, Proof, ProofStep, verify } from "../src/";
import { errorAssert, timingAssert } from "./common-asserts";
import { emptyStepAssert } from "./common-asserts/empty-step-assert";

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

	public async test(): Promise<void>
	{
		const examResult = await verify(this.proof);

		assert.equal(examResult.passed, false, "An exception thrown during arrange should fail");
		errorAssert(examResult.stepExecutionError, ProofStep.arrange);

		emptyStepAssert(examResult.stepExecutionResultSet, ProofStep.act, ProofStep.assert);

		assert.ok(examResult.elapsedNanoseconds >= (examResult.stepExecutionResultSet[ProofStep.act].elapsedNanoseconds + examResult.stepExecutionResultSet[ProofStep.arrange].elapsedNanoseconds + examResult.stepExecutionResultSet[ProofStep.assert].elapsedNanoseconds), "Exam elapsed nanoseconds should greater than or equal to total step time");

		timingAssert(examResult.elapsedNanoseconds);
	}
}