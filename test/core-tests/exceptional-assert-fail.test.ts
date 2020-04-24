import { Proof, ProofStep, verify } from "@premiss/api";
import { failedAssert, passedAssert, skippedStepAssert, timingAssert } from "../common-asserts";
import { emptyAsyncVoid } from "./empty-async-void";

const proof = new class implements Proof
{
	public async [ProofStep.assert](): Promise<void>
	{
		throw failedAssert.error;
	}

	public [ProofStep.annul] = emptyAsyncVoid;
};

export const exceptionalAssertFailTest = async function exceptionalAssertFailTest(): Promise<void>
{
	const examResult = await verify(proof);
	failedAssert(examResult.result, ProofStep.assert);
	skippedStepAssert(examResult.result.examinationResultSet, ProofStep.arrange, ProofStep.act);
	passedAssert(examResult.result.examinationResultSet[ProofStep.annul]);
	timingAssert(examResult);
};