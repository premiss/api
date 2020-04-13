import { Examine } from "../examination";
import { Proof, ProofStep, ProofStepSignature } from "../proof";
import { examineStepExecutionFactory, examineStepSkipFactory } from "./";

export const examineStepFactory = (proof: Proof, proofStep: ProofStep, proofStepSignature: ProofStepSignature | undefined, nextStepExamine: Examine): Examine =>
{
	return proofStepSignature
		? examineStepExecutionFactory({ proofStep, proofStepSignature: (): Promise<void> => proofStepSignature.call(proof) }, nextStepExamine)
		: examineStepSkipFactory(proofStep, nextStepExamine);
};