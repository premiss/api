import { emptyAsyncVoid, Proof, ProofStep, verify } from "../src/";
import { emptyStepAssert, errorAssert, failedAssert, skippedStepAssert, timingAssert } from "./common-asserts";

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
		failedAssert(examResult, ProofStep.act);
		errorAssert(examResult.stepExecutionError, ProofStep.act);
		skippedStepAssert(examResult.stepExecutionResultSet, ProofStep.arrange);
		emptyStepAssert(examResult.stepExecutionResultSet, ProofStep.assert);
		timingAssert(examResult);
	}
}