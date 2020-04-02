import { ProofStep, ProofStepSignature } from "./";

export interface Subject
{
	readonly proofStep: Readonly<ProofStep>;
	readonly proofStepSignature: ProofStepSignature;
}