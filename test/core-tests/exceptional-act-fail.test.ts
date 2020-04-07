import { Proof, ProofStep, verify } from "../../src";
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
	skippedStepAssert(examResult.result.stepExaminationResultSet, ProofStep.arrange);
	emptyStepAssert(examResult.result.stepExaminationResultSet, ProofStep.assert);
	passedAssert(examResult.result.stepExaminationResultSet[ProofStep.annul]);
	timingAssert(examResult);
};