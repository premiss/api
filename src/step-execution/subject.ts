import { ProofStep, ProofStepSignature } from "../";

export interface Subject
{
	readonly proofStep: ProofStep;
	readonly proofStepSignature: ProofStepSignature;
}