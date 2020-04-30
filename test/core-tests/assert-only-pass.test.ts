import { Proof, ProofStep, verify } from "@premiss/api";
import { passedAssert, skippedStepAssert, timingAssert } from "../common-asserts";
import { emptyAsyncVoid } from "./empty-async-void";

const proof = new class implements Proof
{
	public [ProofStep.assert] = emptyAsyncVoid;
};

export const assertOnlyPassTest = async function emptyAssertPassTest(): Promise<void>
{
	const examResult = await verify(proof);
	passedAssert(examResult);
	passedAssert(examResult.result.examinationResultSet[ProofStep.assert]);
	skippedStepAssert(examResult.result.examinationResultSet, ProofStep.arrange, ProofStep.act, ProofStep.annul);
	timingAssert(examResult);
};