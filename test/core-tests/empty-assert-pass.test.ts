import { Proof, ProofStep, verify } from "../../src";
import { passedAssert, skippedStepAssert, timingAssert } from "../common-asserts";
import { emptyAsyncVoid } from "./empty-async-void";

const proof = new class implements Proof
{
	public [ProofStep.assert] = emptyAsyncVoid;
};

export const emptyAssertPassTest = async function emptyAssertPassTest(): Promise<void>
{
	const examResult = await verify(proof);
	passedAssert(examResult);
	skippedStepAssert(examResult.result.stepExecutionResultSet, ProofStep.arrange, ProofStep.act, ProofStep.annul);
	timingAssert(examResult);
};