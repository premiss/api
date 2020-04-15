import { verify } from "../../src";
import { Proof, ProofStep } from "../../src/proof";
import { emptyStepAssert, failedAssert, passedAssert, timingAssert } from "../common-asserts";
import { emptyAsyncVoid } from "./empty-async-void";

const proof = new class implements Proof
{
	public async [ProofStep.arrange](): Promise<void>
	{
		throw failedAssert.error;
	}

	public [ProofStep.assert] = emptyAsyncVoid;

	public [ProofStep.annul] = emptyAsyncVoid;
};

export const exceptionalArrangeFailTest = async function exceptionalArrangeFailTest(): Promise<void>
{
	const examResult = await verify(proof);
	failedAssert(examResult.result, ProofStep.arrange);
	emptyStepAssert(examResult.result.examinationResultSet, ProofStep.act, ProofStep.assert);
	passedAssert(examResult.result.examinationResultSet[ProofStep.annul]);
	timingAssert(examResult);
};