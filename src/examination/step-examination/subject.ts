import { ProofStep, ProofStepSignature } from "../../index";

export interface Subject
{
	readonly proofStep: ProofStep;
	readonly proofStepSignature: ProofStepSignature;
}