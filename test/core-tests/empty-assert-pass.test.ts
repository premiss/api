import { Proof, ProofStep, verify } from "../../src";
import { passedAssert, skippedStepAssert, timingAssert } from "../common-asserts";
import { emptyAsyncVoid } from "./empty-async-void";

const proof = new class implements Proof
{
	public [ProofStep.assert] = emptyAsyncVoid;

	public [ProofStep.annul] = emptyAsyncVoid;
};

export const emptyAssertPassTest = async function emptyAssertPassTest(): Promise<void>
{
	const examResult = await verify(proof);
	passedAssert(examResult);
	passedAssert(examResult.result.stepExecutionResultSet[ProofStep.assert]);
	skippedStepAssert(examResult.result.stepExecutionResultSet, ProofStep.arrange, ProofStep.act);
	passedAssert(examResult.result.stepExecutionResultSet[ProofStep.annul]);
	timingAssert(examResult);
};