import { Proof, ProofStep, verify } from "../src/";
import { emptyStepAssert, failedAssert, skippedStepAssert, timingAssert } from "./common-asserts";
import { emptyAsyncVoid } from "./empty-async-void";

const proof = new class implements Proof
{
	public async [ProofStep.act](): Promise<void>
	{
		throw failedAssert.error;
	}

	public [ProofStep.assert] = emptyAsyncVoid;
};

export const exceptionalActFailTest = async (): Promise<void> =>
{
	const examResult = await verify(proof);
	failedAssert(examResult, ProofStep.act);
	skippedStepAssert(examResult.stepExecutionResultSet, ProofStep.arrange);
	emptyStepAssert(examResult.stepExecutionResultSet, ProofStep.assert, ProofStep.annul);
	timingAssert(examResult);
};