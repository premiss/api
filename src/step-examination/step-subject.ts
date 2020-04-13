import { ProofStep, ProofStepSignature } from "../proof";

export interface StepSubject
{
	readonly proofStep: ProofStep;
	readonly proofStepSignature: ProofStepSignature;
}