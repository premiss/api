import { verify } from "../../src";
import { Proof, ProofStep } from "../../src/proof";
import { emptyStepAssert, failedAssert, passedAssert, skippedStepAssert, timingAssert } from "../common-asserts";
import { emptyAsyncVoid } from "./empty-async-void";

const proof = new class implements Proof
{
	public async [ProofStep.act](): Promise<void>
	{
		throw failedAssert.error;
	}

	public [ProofStep.assert] = emptyAsyncVoid;

	public [ProofStep.annul] = emptyAsyncVoid;
};

export const exceptionalActFailTest = async function exceptionalActFailTest(): Promise<void>
{
	const examResult = await verify(proof);
	failedAssert(examResult.result, ProofStep.act);
	skippedStepAssert(examResult.result.examinationResultSet, ProofStep.arrange);
	emptyStepAssert(examResult.result.examinationResultSet, ProofStep.assert);
	passedAssert(examResult.result.examinationResultSet[ProofStep.annul]);
	timingAssert(examResult);
};