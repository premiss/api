import { Proof, ProofStep, verify } from "../src/";
import { emptyStepAssert, failedAssert, timingAssert } from "./common-asserts";
import { emptyAsyncVoid } from "./empty-async-void";

const proof = new class implements Proof
{
	public async [ProofStep.arrange](): Promise<void>
	{
		throw failedAssert.error;
	}

	public [ProofStep.assert] = emptyAsyncVoid;
};

export const exceptionalArrangeFailTest = async (): Promise<void> =>
{
	const examResult = await verify(proof);
	failedAssert(examResult, ProofStep.arrange);
	emptyStepAssert(examResult.stepExecutionResultSet, ProofStep.act, ProofStep.assert, ProofStep.annul);
	timingAssert(examResult);
};