import { Proof, ProofStep, verify } from "../src/";
import { emptyStepAssert, failedAssert, timingAssert } from "./common-asserts";
import { emptyAsyncVoid } from "./empty-async-void";

export class ExceptionalArrangeFailTest
{
	private readonly proof = new class implements Proof
	{
		public async [ProofStep.arrange](): Promise<void>
		{
			throw failedAssert.error;
		}

		public [ProofStep.assert] = emptyAsyncVoid;
	};

	public async test(): Promise<void>
	{
		const examResult = await verify(this.proof);
		failedAssert(examResult, ProofStep.arrange);
		emptyStepAssert(examResult.stepExecutionResultSet, ProofStep.act, ProofStep.assert, ProofStep.annul);
		timingAssert(examResult);
	}
}