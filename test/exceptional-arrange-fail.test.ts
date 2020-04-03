import { emptyAsyncVoid, Proof, ProofStep, verify } from "../src/";
import { emptyStepAssert, errorAssert, failedAssert, timingAssert } from "./common-asserts";

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
		failedAssert(examResult, ProofStep.arrange);
		errorAssert(examResult.stepExecutionError, ProofStep.arrange);
		emptyStepAssert(examResult.stepExecutionResultSet, ProofStep.act, ProofStep.assert, ProofStep.annul);
		timingAssert(examResult);
	}
}