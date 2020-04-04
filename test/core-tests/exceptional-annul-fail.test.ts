import { Proof, ProofStep, verify } from "../../src";
import { failedAssert, passedAssert, skippedStepAssert, timingAssert } from "../common-asserts";
import { emptyAsyncVoid } from "./empty-async-void";

const proof = new class implements Proof
{
	public [ProofStep.assert] = emptyAsyncVoid;

	public async [ProofStep.annul](): Promise<void>
	{
		throw failedAssert.error;
	}
};

export const exceptionalAnnulFailTest = async (): Promise<void> =>
{
	const examResult = await verify(proof);
	failedAssert(examResult, ProofStep.annul);
	skippedStepAssert(examResult.stepExecutionResultSet, ProofStep.arrange, ProofStep.act);
	passedAssert(examResult.stepExecutionResultSet[ProofStep.assert]);
	timingAssert(examResult);
};