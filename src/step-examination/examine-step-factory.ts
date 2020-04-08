import { Proof } from "../proof";
import { ProofStep } from "../proof-step";
import { ProofStepSignature } from "../proof-step-signature";
import { Examine } from "../examination/examine";
import { examineStepExecutionFactory } from "./examine-step-execution-factory";
import { examineStepSkipFactory } from "./examine-step-skip-factory";

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