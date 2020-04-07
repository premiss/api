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

export const exceptionalAnnulFailTest = async function exceptionalAnnulFailTest(): Promise<void>
{
	const examResult = await verify(proof);
	failedAssert(examResult.result, ProofStep.annul);
	skippedStepAssert(examResult.result.stepExaminationResultSet, ProofStep.arrange, ProofStep.act);
	passedAssert(examResult.result.stepExaminationResultSet[ProofStep.assert]);
	timingAssert(examResult);
};