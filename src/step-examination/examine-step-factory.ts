import { Proof, ProofStep, ProofStepSignature } from "../";
import { Examine } from "../examination";
import { examineStepExecutionFactory, examineStepSkipFactory } from "./";

const createProofStepSignature = (proof: Proof, proofStepSignature: ProofStepSignature): ProofStepSignature =>
{
	return (): Promise<void> => proofStepSignature.call(proof);
};

export const examineStepFactory = (proof: Proof, proofStep: ProofStep, proofStepSignature: ProofStepSignature | undefined, nextStepExamine: Examine): Examine =>
{
	return proofStepSignature
		? examineStepExecutionFactory({ proofStep, proofStepSignature: createProofStepSignature(proof, proofStepSignature) }, nextStepExamine)
		: examineStepSkipFactory(proofStep, nextStepExamine);
};