import { Proof, ProofStep, verify } from "../../src";
import { emptyStepAssert, failedAssert, skippedStepAssert, timingAssert } from "../common-asserts";

const proof = new class implements Proof
{
	public async [ProofStep.assert](): Promise<void>
	{
		throw failedAssert.error;
	}
};

export const exceptionalAssertFailTest = async function exceptionalAssertFailTest(): Promise<void>
{
	const examResult = await verify(proof);
	failedAssert(examResult, ProofStep.assert);
	skippedStepAssert(examResult.stepExecutionResultSet, ProofStep.arrange, ProofStep.act);
	emptyStepAssert(examResult.stepExecutionResultSet, ProofStep.annul);
	timingAssert(examResult);
};