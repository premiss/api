import { ProofStep, ProofStepSignature } from "../";

export interface StepSubject
{
	readonly proofStep: ProofStep;
	readonly proofStepSignature: ProofStepSignature;
}