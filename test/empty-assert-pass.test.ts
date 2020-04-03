import { emptyAsyncVoid, Proof, ProofStep, verify } from "../src/";
import { passedAssert, skippedStepAssert, timingAssert } from "./common-asserts";

export class EmptyAssertPassTest
{
	private readonly proof = new class implements Proof
	{
		public [ProofStep.assert] = emptyAsyncVoid;
	};

	public async test(): Promise<void>
	{
		const examResult = await verify(this.proof);
		passedAssert(examResult);
		skippedStepAssert(examResult.stepExecutionResultSet, ProofStep.arrange, ProofStep.act, ProofStep.annul);
		timingAssert(examResult);
	}
}