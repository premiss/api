import { ProofStep, ProofStepSignature } from "../index";

export interface StepSubject
{
	readonly proofStep: ProofStep;
	readonly proofStepSignature: ProofStepSignature;
}