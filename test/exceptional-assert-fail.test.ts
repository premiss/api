import { Proof, ProofStep, verify } from "../src/";
import { emptyStepAssert, failedAssert, skippedStepAssert, timingAssert } from "./common-asserts";

export class ExceptionalAssertFailTest
{
	private readonly proof = new class implements Proof
	{
		public async [ProofStep.assert](): Promise<void>
		{
			throw failedAssert.error;
		}
	};

	public async test(): Promise<void>
	{
		const examResult = await verify(this.proof);
		failedAssert(examResult, ProofStep.assert);
		skippedStepAssert(examResult.stepExecutionResultSet, ProofStep.arrange, ProofStep.act);
		emptyStepAssert(examResult.stepExecutionResultSet, ProofStep.annul);
		timingAssert(examResult);
	}
}